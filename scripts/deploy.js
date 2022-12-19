// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  [owner, signer2, signer3] = await ethers.getSigners();

  const CrowdCoin = await hre.ethers.getContractFactory("CrowdCoin");
  const crowdCoin = await CrowdCoin.deploy();

  await crowdCoin.deployed();

  console.log(
    "CrowdCoin deployed to:" , crowdCoin.address
  );

  const CrowdSale = await hre.ethers.getContractFactory("CrowdSale");
  const crowdSale = await CrowdSale.deploy(2, owner.address, crowdCoin.address);

  // await crowdCoin.connect(owner).mint(
  //   crowdSale.address,
  //   ethers.utils.parseEther('10000')
  // )

  await crowdSale.deployed();

  console.log("CrowdSale deployed to:", crowdSale.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
