### BlockPass SmartContract: Decentralized Event Ticketing on Aurora

Welcome to BlockPass, a decentralized contract built on the Aurora blockchain that transforms event ticketing through blockchain technology and NFTs. This README provides guidance on installation, setup, and usage of the BlockPass smart contract.

### Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
   - [Creating a New Pass](#creating-a-new-pass)
   - [Purchasing a Pass](#purchasing-a-pass)
4. [Key Features](#key-features)
5. [Contributing](#contributing)

### Introduction
BlockPass is a decentralized platform built on the Aurora blockchain, designed to address the limitations of traditional event ticketing. By leveraging NFTs, BlockPass ensures fair ticket pricing, prevents scalping, and guarantees the authenticity of event tickets. Each event pass is minted as a unique NFT upon purchase, securing ownership and transparency.

### Installation
To set up and deploy BlockPass on the Aurora blockchain, follow these steps:

1. Clone the BlockPass repository:
   ```bash
   git clone https://github.com/Horlarmmy/Blockpass
   ```

2. Navigate to the project directory and install dependencies:
   ```bash
   cd Blockpass
   yarn install
   ```

3. Build the smart contract using the harhat:
   ```bash
    npx hardhat compile
   ```

4. Deploy the contract to your Aurora testnet account:
   ```bash
   npx hardhat run scripts/deploy.js --network testnet_aurora
   ```

### Usage
#### Creating a New Pass
To create a new event pass, organizers can follow these steps:

1. Connect your Metamask wallet to the BlockPass platform.
2. Navigate to the "Create New Pass" section on the front-end interface.
3. Fill in the details for the pass, including the maximum pass count, start and end times for sales, the initial pass price, metadata, and category.
4. Confirm the pass creation, and it will be recorded on the Aurora blockchain.

#### Purchasing a Pass
To purchase a pass, attendees can follow these steps:

1. Connect your Metamask wallet to the BlockPass platform.
2. Browse available passes and select the desired event.
3. Review the pass details, including the price and availability.
4. Click "Purchase Pass" and confirm the transaction with your wallet.
5. Upon successful purchase, the pass is minted as an NFT in the buyer's wallet.

### Key Features
- **Event NFT Creation**: Organizers can create passes with unique metadata and categories, each of which is minted as an NFT.
- **Pass Purchase and Ownership**: Users can purchase passes and view their ownership history on-chain.
- **Transparent Records**: All ticket transactions are recorded immutably, ensuring transparency and preventing fraud.

### Contributing
We welcome community contributions to improve BlockPass. To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Submit a pull request describing your changes.


Thank you for choosing BlockPass for your event ticketing needs! 🎫🚀
