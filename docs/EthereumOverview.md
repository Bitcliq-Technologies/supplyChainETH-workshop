# Ethereum Overview

## What is Ethereum?
Ethereum is an open source, globally decentralized computing infrastructure that executes programs called smart contracts. It uses a blockchain to synchronize and store the system’s state changes, along with a cryptocurrency called ether to meter and constrain execution resource costs.

The Ethereum platform enables developers to build powerful decentralized applications with built-in economic functions. While providing high availability, auditability, transparency, and neutrality, it also reduces or eliminates censorship and reduces certain counterparty risks.

Unlike Bitcoin, which has a very limited scripting language, Ethereum is designed to be a general-purpose programmable blockchain that runs a virtual machine capable of executing code of arbitrary and unbounded complexity. Where Bitcoin’s Script language is, intentionally, constrained to simple true/false evaluation of spending conditions, Ethereum’s language is Turing complete, meaning that Ethereum can straightforwardly function as a general-purpose computer.

## Ethereum Components
* P2P network: Ethereum runs on the Ethereum main network;
* Consensus rules: Consensus rules are defined in the reference specification (Yellow Paper);
* Transactions: Are network messages that include (among other things) a sender, recipient, value, and data payload.
* State machine: State transitions are processed by the Ethereum Virtual Machine (EVM). EVM programs, called "smart contracts," are written in high-level languages (e.g. Solidity) and compiled to bytecode for execution on the EVM.
* Data structures: Ethereum’s state is stored locally on each node as a database (ex. LevelDB), which contains the transactions and system state in a serialized hashed data structure called a Merkle Patricia Tree.
* Consensus algorithm: Ethereum uses Bitcoin’s consensus model, Nakamoto Consensus, which uses sequential single-signature blocks, weighted in importance by PoW (Proff of Work) to determine the longest chain and therefore the current state. Currently, Ethereum is transitioning to PoS (Proff of Stake) weighted voting system for Ethereum version 2.0;
* Economic security: Ethereum currently uses a PoW algorithm called Ethash, but as mentioned before, PoS will be used on the Ethereum version 2.0;
* Clients: Client software that runs on the nodes.

## Decentralized Applications (Dapps)

DApp is a web application that is built on top of open, decentralized, peer-to-peer infrastructure services (blockchain). These are compose by at least:
* Smart contracts on a blockchain;
* A web frontend user interface.

[![Ethereum Diagram](https://static.packt-cdn.com/products/9781788831383/graphics/da29eb83-8343-4c0a-8c90-968dc087eb95.png)](lhttps://static.packt-cdn.com/products/9781788831383/graphics/da29eb83-8343-4c0a-8c90-968dc087eb95.png)


## References
* [Book - Mastering Ethereum](https://github.com/ethereumbook/ethereumbook)
* [Ethereum Architecture](https://subscription.packtpub.com/book/application_development/9781788831383/1/ch01lvl1sec15/blockchain-and-ethereum-architecture)