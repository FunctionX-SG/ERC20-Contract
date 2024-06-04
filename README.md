## Deploying an ERC20 contract to FunctionX

The ERC20 contract in this Github repository utilises the [OpenZeppelin contract library](https://www.openzeppelin.com/contracts) version 4.9.0. The contract is Initializable, ERC20Upgradeable, ERC20BurnableUpgradeable, ERC20PausableUpgradeable, AccessControlUpgradeable, ERC20PermitUpgradeable, UUPSUpgradeable. 

The contract specifies 4 contract roles: **defaultAdmin**, **pauser**, **minter** and **upgrader**.

> [!NOTE]
> * defaultAdmin has the highest level of permissions. It can grant and revoke other roles, and perform any action within the contract. 
> * pauser can pause and unpause the contract.
> * minter can mint new tokens.
> * upgrader can upgrade the contract implementation

We recommend using Solidity compiler version `0.8.18` as defined in the `hardhat.config.js` file.

### Here are the steps you can take after copying this Github repository on your local computer: 
1. Open the repository on your preferred IDE.
2. Run `npm install --save-dev hardhat` to install Hardhat. We will be using Hardhat to deploy the contract.
3. Run `npm install` to install dependencies.
4. Create a `.env` file at the project root and input your deployer wallet’s private key with the following format: 
`PRIVATE_KEY="enter your private key here"`
5. In the `deploy.js` file under the scripts folder, input the following details: 
> * defaultAdmin address
> * Token name 
> * Token symbol
> * In this example, we have given the other 3 contract roles (pauser, minter and upgrader with a 0x0 address), since the defaultAdmin can perform all functions. Feel free to change this structure. 
6. Run `npx hardhat compile` to compile the contract files.
7. Run `npx hardhat run scripts/deploy.js --network fxMainnet` to deploy the contract on FunctionX mainnet. To deploy on FunctionX testnet, change the network to `fxTestnet` in the command. Please ensure that your deployer wallet has sufficient FX to deploy the contract.
8. The terminal should print the contract address. Copy the contract address to view your deployed contract on Function X blockchain explorer. Here are the explorer links https://starscan.io/ (Mainnet) https://testnet.starscan.io/ (Testnet)

### After deploying the contract to Function X mainnet or testnet: 
1. You should notice that the contract address from step 8 above is a proxy address. The proxy address should point to an implementation address. For more information on proxy and implementation contracts, please refer [here](https://info.etherscan.com/what-is-proxy-contract/#:~:text=A%20proxy%20contract%20is%20an,of%20the%20%27implementation%27%20contract.).
2. Ensure that the implementation contract is verified. If the implementation contract is not verified, you may follow the steps below:
> 1. In your code repository, go to `artifacts` folder. You should be able to see a `build-info` folder. Open the `.json` file, and format it to make it more readable.
>> ![buildinfo](https://github.com/FunctionX-SG/ERC20-Contract/assets/143979872/16b28510-16dc-4c2c-8f85-077172a3cdac)
> 2. Collapse the input range, and copy the <span style="color:red;">_"input"_ </span> value. Paste and save it into another `.json` file. We will be using this `.json` file for verification later.
>> ![Input](https://github.com/FunctionX-SG/ERC20-Contract/assets/143979872/704eee3c-048e-401d-ae89-76e00ef8ae80)
> 3. Go to the implementation contract, scroll down and select the _"Code"_ tab. Select _"Verify & Publish"_.
>> ![verify](https://github.com/FunctionX-SG/ERC20-Contract/assets/143979872/baca0907-4e0a-470c-b041-2eba8f8783f5)
> 4. Select _"Verify via Standard Input JSON"_
>> ![json](https://github.com/FunctionX-SG/ERC20-Contract/assets/143979872/2e7dcbf7-e080-4b26-8a3e-a08dcdd9bd3d)
> 5. Give your implementation contract a name (this will be the contract name), and select the compiler `v0.8.18+commit.87f61d96`. Upload the input JSON created, then select _"Verify & publish"_.
>> ![Submit 2](https://github.com/FunctionX-SG/ERC20-Contract/assets/143979872/5eb3442c-889c-4874-9ca4-723645b482f4)
> 6. Your contract should be verified now.
3. Go back to the proxy contract page. On the _"Read Proxy"_ page, you should see that the `totalSupply` of your token is 1, or 1000000000000000000 wei.
>> ![totalSupply](https://github.com/FunctionX-SG/ERC20-Contract/assets/143979872/c3e6af51-30c7-4cb6-afff-fa2f68448039)
4. You will be able to mint more tokens as necessary. Go to the _"Write Proxy"_ page, scroll down and you will see the mint function. Enter the address that you want to mint to. We suggest inputting the contract deployer address. The amount you want to mint should be in wei (10^8). Select ‘Write’, and ensure that the transaction is executed from a wallet that has the admin or minter role.
>> ![mint](https://github.com/FunctionX-SG/ERC20-Contract/assets/143979872/794515cd-53bb-4df6-a91a-b082bbcc2a30)
6. Congratulations, you have successfully deployed an ERC20 token contract on FunctionX!
