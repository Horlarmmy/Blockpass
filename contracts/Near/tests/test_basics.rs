use near_workspaces::types::NearToken;
use serde_json::json;
use std::collections::HashMap;

const FIVE_NEAR: NearToken = NearToken::from_near(5);

#[tokio::test]
async fn test_blockpass_contract() -> Result<(), Box<dyn std::error::Error>> {
    let sandbox = near_workspaces::sandbox().await?;
    let contract_wasm = near_workspaces::compile_project("./").await?;

    let root = sandbox.root_account()?;
    let user_account = root.create_subaccount("user").transact().await?.unwrap();
    let contract_account = root
        .create_subaccount("contract")
        .initial_balance(FIVE_NEAR)
        .transact().await?
        .unwrap();
    let contract = contract_account.deploy(&contract_wasm).await?.unwrap();

    // Initialize contract with metadata
    let init_outcome = contract
        .call("new_default_meta")
        .args_json(json!({"owner_id": root.id()}))
        .transact().await?;
    assert!(init_outcome.is_success());

    // User creates a block pass
    let create_block_pass_outcome = user_account
        .call(contract.id(), "create_block_pass")
        .args_json(
            json!({
            "max_pass_count": 100,
            "start_time": 1700000000000000000,
            "sales_end_time": 1800000000000000000,
            "pass_price": 1000000000000u128,
            "metadata": {
                "title": "VIP Event",
                "description": "Exclusive access to VIP event",
                "media": null,
                "media_hash": null,
                "copies": 100,
                "issued_at": 17000000000,
                "expires_at": 18000000000,
                "starts_at": 17000000000,
                "updated_at": null,
                "extra": null,
                "reference": null,
                "reference_hash": null
            },
            "category": "VIP"
        })
        )
        .transact().await?;
    assert!(create_block_pass_outcome.is_success());

    // User purchases the block pass
    let purchase_outcome = user_account
        .call(contract.id(), "purchase_pass")
        .args_json(json!({ "block_pass_id": 1 }))
        .deposit(1000000000000)
        .transact().await?;
    assert!(purchase_outcome.is_success());

    // Verify user booked passes
    let booked_passes: Vec<u64> = contract
        .view("get_user_booked_passes")
        .args_json(json!({ "user": user_account.id() })).await?
        .json()?;
    assert_eq!(booked_passes, vec![1]);

    // Verify retrieval of all block passes
    let all_block_passes: Vec<HashMap<String, serde_json::Value>> = contract
        .view("get_all_block_passes")
        .args_json(json!({})).await?
        .json()?;
    assert_eq!(all_block_passes.len(), 1);

    Ok(())
}
