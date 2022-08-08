require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
    solidity: {
      version: "0.8.4",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    },
    networks: {
      rinkeby: {
        url: `${process.env.ALCHEMY_RINKEBY_URL}`,
        accounts: [`${process.env.RINKEBY_PRIVATE_KEY}`],
      }
    },
    etherscan: {
       apiKey: `${process.env.ETHERSCAN_KEY}`
     }
};
