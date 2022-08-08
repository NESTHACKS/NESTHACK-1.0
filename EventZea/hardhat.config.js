require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");

const {
  ETHERSCAN_API_KEY,
  PRIVATE_API_KEY_URL,
  RINKEBY_PRIVATE_KEY,
  COINMARKETCAP_API_KEY,
} = process.env;

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: PRIVATE_API_KEY_URL,
      accounts: [RINKEBY_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 100000000,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 100,
    },
  },
};
