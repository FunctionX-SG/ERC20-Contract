const { ethers, upgrades } = require("hardhat");

async function main() {
  const defaultAdmin = ""; // include your defaultAdmin address
  const pauser = "0x0000000000000000000000000000000000000000";
  const name = ""; // include your token name
  const symbol = ""; // include your token symbol

  const ERC20 = await ethers.getContractFactory("ERC20");
  const erc20 = await upgrades.deployProxy(
    ERC20,
    [name, symbol, defaultAdmin, pauser, pauser, pauser],
    { kind: "uups", timeout: "0", pollingInterval: "1000" }
  );

  await erc20.deployed();

  console.log("Contract address:", await erc20.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
