// Import ethers from Hardhat package
const { ethers } = require("hardhat");

async function main() {
  // We get the contract to deploy
  const EventPool = await ethers.getContractFactory("EventPool");

  const eventpool = await EventPool.deploy(
    "0x12426A6F6187F36ddfc0850B5a86Aaa85FD42187"
  );

  // here we deploy the contract
  await eventpool.deployed();
  // print the address of the deployed contract
  console.log("Eventpool deployed to:", eventpool.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(60000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: eventpool.address,
    constructorArguments: ["0x12426A6F6187F36ddfc0850B5a86Aaa85FD42187"],
  });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
