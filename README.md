# LUCKY NUMBER

> ## Lucky Number is a project prepared at the end of the NCD training.


**Lucky Number** is a **game** of **chance** played with _two users._

- Each player must deposit **1 NEAR** to play.

- _A random number_ between **1** and **10** is generated for each user.

- The numbers assigned to the users are compared.

- _The big number_ wins the game.

- The total **2 NEAR** taken as a deposit is transferred to the winner account.

- If the numbers are _equal,_ **1 NEAR** deposit is paid back to users' accounts.

## Prerequisites

Lucky Number is a smart contract running on NEAR. We should install near-cli to play.

- Install yarn.
```
yarn
```

- Install near-cli
```
npm install --global near-cli
```

## Build - Deploy

- First, we need to **login.**
```
near login
```

- **Build** to the contract.
```
yarn build 
```

- **Deploy** to the conract.
```
yarn deploy
```

- Copy **dev-123-789** from the _neardev/dev-account_ folder.
```
export CONTRACT=<your_dev_id>
```

## How to Play

- **Create** a new game.
```
near call $CONTRACT createLucky --accountId <your_account.testnet> --amount 1
```

- For the **Second Player** to participate.
```
near call $CONTRACT findLuck '{"id":"<gameId>"}' --accountId <player_2>.testnet --amount 1
```

- Are you fortunate ?
```
near call $CONTRACT fortune '{"id": "<gameId>"}' --accountId <any_player.testnet>
```
> ## **Check your wallet. :)**


## Access Smart Contract

- To search for _any game_.
```
near call $CONTRACT viewLucky '{"id": "<game_id>"}' --accountId <your_account.testnet>
```

- To see _all games_.
```
near call $CONTRACT allLucky --accountId <your_account.testnet>
```
