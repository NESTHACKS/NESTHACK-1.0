require("@nomicfoundation/hardhat-toolbox");
require( 'dotenv' ).config();

const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    kovan: {
      url: "https://kovan.infura.io/v3/74e3648e6d5f4de7a2d7e6e78f1a3581", //Input your Kovan node URL here
      accounts: [PRIVATE_KEY ] //Input your Kovan account here
    }
  },
   solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};





// module.exports = {
//   defaultNetwork: "rinkeby",
//   networks: {
//     hardhat: {
//     },
//     rinkeby: {
//       url: "https://eth-rinkeby.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
//       accounts: [privateKey1, privateKey2, ...]
//     }
//   },
//   solidity: {
//     version: "0.8.9",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   },
//   paths: {
//     sources: "./contracts",
//     tests: "./test",
//     cache: "./cache",
//     artifacts: "./artifacts"
//   },
//   mocha: {
//     timeout: 40000
//   }
// }