use std::collections::{ HashMap };
use near_sdk::borsh::{ BorshDeserialize, BorshSerialize };
use near_sdk::collections::{ LazyOption, LookupMap, UnorderedMap, UnorderedSet };
use near_sdk::json_types::{ Base64VecU8, U64 };
use near_sdk::serde::{ Deserialize, Serialize };
use near_sdk::{
    env,
    near_bindgen,
    NearToken,
    CryptoHash,
    AccountId,
    PanicOnDefault,
    Promise,
    PromiseOrValue,
    BorshStorageKey,
    NearSchema,
};

use crate::internal::*;
pub use crate::metadata::*;
pub use crate::nft_core::*;

mod internal;
mod metadata;
mod mint;
mod nft_core;

pub const NFT_METADATA_SPEC: &str = "1.0.0";
const ONE_YOCTONEAR: NearToken = NearToken::from_yoctonear(1);

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone, NearSchema)]
#[serde(crate = "near_sdk::serde")]
pub struct BlockPassDetails {
    pub owner_id: AccountId,
    pub block_pass_id: u64,
    pub max_pass_count: u64,
    pub start_time: u64,
    pub sales_end_time: u64,
    pub pass_price: u128,
    pub passes_sold: u64,
    pub metadata: TokenMetadata,
    pub category: String,
    pub organizer: AccountId,
}

#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize, PanicOnDefault)]
pub struct Blockpass {
    pub owner_id: AccountId,
    pub block_pass_count: u64,
    pub token_id_counter: u64,
    pub tokens_per_owner: LookupMap<AccountId, UnorderedSet<TokenId>>,
    pub tokens_by_id: LookupMap<U64, Token>,
    pub block_pass_list: UnorderedMap<u64, BlockPassDetails>,
    pub booked_pass_by_user: LookupMap<AccountId, Vec<u64>>,
    pub token_metadata_by_id: UnorderedMap<TokenId, TokenMetadata>,
    pub metadata: LazyOption<NFTContractMetadata>,
}

#[derive(BorshSerialize, BorshStorageKey)]
pub enum StorageKey {
    TokensPerOwner,
    TokensById,
    TokenMetadataById,
    NFTContractMetadata,
    BlockPassList,
    BookedPassByUser,
    TokenPerOwnerInner {
        account_id_hash: CryptoHash,
    },
}

#[near_bindgen]
impl Blockpass {
    #[init]
    pub fn new_default_meta(owner_id: AccountId) -> Self {
        Self::new(owner_id, NFTContractMetadata {
            spec: NFT_METADATA_SPEC.to_string(),
            name: "Blockpass Event NFT".to_string(),
            symbol: "EVENT".to_string(),
            icon: None,
            base_uri: None,
            reference: None,
            reference_hash: None,
        })
    }

    #[init]
    pub fn new(owner_id: AccountId, metadata: NFTContractMetadata) -> Self {
        Self {
            owner_id,
            block_pass_count: 0,
            token_id_counter: 1,
            tokens_per_owner: LookupMap::new(StorageKey::TokensPerOwner),
            tokens_by_id: LookupMap::new(StorageKey::TokensById),
            block_pass_list: UnorderedMap::new(StorageKey::BlockPassList),
            booked_pass_by_user: LookupMap::new(StorageKey::BookedPassByUser),
            token_metadata_by_id: UnorderedMap::new(StorageKey::TokenMetadataById),
            metadata: LazyOption::new(StorageKey::NFTContractMetadata, Some(&metadata)),
        }
    }

    pub fn create_block_pass(
        &mut self,
        max_pass_count: u64,
        start_time: u64,
        sales_end_time: u64,
        pass_price: u128,
        metadata: TokenMetadata,
        category: String
    ) -> u64 {
        assert!(max_pass_count > 0, "Maximum pass count must be greater than 0.");
        let block_pass_id = self.block_pass_count + 1;

        let timestamp = env::block_timestamp();
        let user = env::predecessor_account_id();
        let block_pass = BlockPassDetails {
            owner_id: user.clone(),
            block_pass_id,
            max_pass_count,
            start_time,
            sales_end_time,
            pass_price,
            passes_sold: 0,
            metadata,
            category,
            organizer: user.clone(),
        };

        self.block_pass_list.insert(&block_pass_id, &block_pass);
        env::log_str(
            &format!(
                "BlockPassCreated: Organizer: {}, CreationTime: {}, BlockPassID: {}",
                user,
                timestamp,
                block_pass_id
            )
        );

        block_pass_id
    }

    #[payable]
    pub fn purchase_pass(&mut self, block_pass_id: u64) {
        let mut block_pass = self.block_pass_list
            .get(&block_pass_id)
            .expect("Block pass not found.");
        let timestamp = env::block_timestamp();
        let deposit = env::attached_deposit();
        let initial_pass_price = NearToken::from_yoctonear(block_pass.pass_price);
        let user = env::predecessor_account_id();

        assert!(deposit >= initial_pass_price, "Insufficient funds to purchase the pass.");

        if deposit > initial_pass_price {
            let refund_amount = NearToken::from_yoctonear(
                deposit.as_yoctonear() - initial_pass_price.as_yoctonear()
            );
            Promise::new(user.clone()).transfer(refund_amount);
        }

        assert!(timestamp >= block_pass.start_time, "Sale has not started.");
        assert!(timestamp <= block_pass.sales_end_time, "Sale has ended.");
        assert!(block_pass.passes_sold < block_pass.max_pass_count, "No more passes available.");

        block_pass.passes_sold += 1;
        self.token_id_counter += 1;

        let token_id = self.token_id_counter.to_string();

        self.nft_mint(token_id.clone(), block_pass.metadata.clone(), user.clone());

        let mut passes = self.booked_pass_by_user.get(&user).unwrap_or_else(Vec::new);

        passes.push(block_pass_id);
        self.booked_pass_by_user.insert(&user, &passes);
        self.block_pass_list.insert(&block_pass_id, &block_pass);

        env::log_str(
            &format!(
                "PassBooked: Buyer: {}, TokenID: {}, BlockPassID: {}",
                user,
                token_id,
                block_pass_id
            )
        );
    }

    pub fn get_user_booked_passes(&self, user: AccountId) -> Vec<u64> {
        self.booked_pass_by_user.get(&user).unwrap_or_else(Vec::new)
    }

    pub fn get_all_block_passes(&self) -> Vec<BlockPassDetails> {
        self.block_pass_list.values_as_vector().to_vec()
    }

    pub fn get_block_passes_by_category(&self, category: String) -> Vec<BlockPassDetails> {
        self.block_pass_list
            .values()
            .filter(|pass| pass.category == category)
            .collect()
    }
}
