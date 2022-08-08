
const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  //  0xFEe1C02B91Fd7e846962E9e9336E4D7082420E11
const cUSDC = "0x4a92e71227d294f041bd82dd8f78591b75140d63";
  const Coverage = await hre.ethers.getContractFactory("Coverage");
  const lock = await Coverage.deploy(cUSDC );

  await lock.deployed();

  console.log("Coverage deployed to:", lock.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
