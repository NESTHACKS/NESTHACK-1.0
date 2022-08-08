
const hre = require("hardhat");

async function main() {

  const Marketplace = await hre.ethers.getContractFactory("FreechainMarketplace");
  const marketplace = await Marketplace.deploy();
  console.log("Marketplace contract deployed at:", marketplace.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
