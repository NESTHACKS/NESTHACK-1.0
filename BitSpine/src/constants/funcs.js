// const borrowBalance = async () => {
//   try {
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = provider.getSigner();
//     const address = await signer.getAddress();
//     const contract = new ethers.Contract(
//       CONSTANTS.CUSDT_CA,
//       CONSTANTS.CUSDT_ABI,
//       signer
//     );

//     console.log(address);
//     let balance = await contract.borrowBalanceCurrent(address);
//     // balance = balance / Math.pow(10, 18);
//     balance.wait();
//     console.log({ balance }, 'TX_________________');
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getAssetsIn = async () => {
//   try {
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = provider.getSigner();
//     const address = await signer.getAddress();
//     const contract = new ethers.Contract(
//       CONSTANTS.COMPTROLLER_CONTRACT_ADDRESS,
//       CONSTANTS.COMPT_ABI,
//       signer
//     );

//     // console.log({ address });
//     // let assets = await contract.getAssetsIn(address);
//     console.log({ address });
//     let assets = await contract.getAllMarkets();
//     // balance = balance / Math.pow(10, 18);
//     console.log({ assets }, 'TX_________________');
//   } catch (error) {
//     console.log(error);
//   }
// };
// const uploadFileToContract = async (payload) => {
//   try {
//     console.log(payload, 'payl________-');
//     console.log('C__________________________');
//     const tx = await contract.addUserFile(
//       payload.uid,
//       payload.name,
//       payload.url,
//       payload.thumbnail
//     );
//     console.log(tx, 'uploaded');
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getCollateralFactor = async () => {
//   try {
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = provider.getSigner();
//     const address = await signer.getAddress();
//     const contract = new ethers.Contract(
//       CONSTANTS.COMPTROLLER_CONTRACT_ADDRESS,
//       CONSTANTS.COMPT_ABI,
//       signer
//     );

//     console.log(address);
//     let { 1: collateralFactor } = await contract.markets(
//       CONSTANTS.CONTRACT_ADDRESS
//     );
//     collateralFactor = (collateralFactor / 1e18) * 100;
//     console.log({ collateralFactor }, 'TX_________________');
//   } catch (error) {
//     console.log(error);
//   }
// };

// const exitMarket = async () => {
//     try {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const contract = new ethers.Contract(
//             CONSTANTS.COMPTROLLER_CONTRACT_ADDRESS,
//             CONSTANTS.COMPT_ABI,
//             signer
//         );

//         const markets = [CONSTANTS.CONTRACT_ADDRESS];

//         setLoader(true);
//         const tx = await contract.exitMarket(CONSTANTS.CONTRACT_ADDRESS, {
//             gasLimit: ethers.utils.hexlify(250000),
//             gasPrice: ethers.utils.hexValue(20000000000),
//         });
//         await tx.wait();
//         setLoader(false);
//         setReload(!reload);
//     } catch (error) {
//         setLoader(false);
//         console.log(error);
//     }
// };

// const getSupplyBalance = async () => {
//   try {
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = provider.getSigner();
//     const address = await signer.getAddress();

//     const contract = new ethers.Contract(
//       CONSTANTS.CONTRACT_ADDRESS,
//       CONSTANTS.CONTRACT_ABI,
//       signer
//     );

//     const tx = (await contract.balanceOf(address)) / 1e8;
//     console.log(tx, '______________________TX');
//     setData(tx);
//     return contract;
//   } catch (err) {
//     console.log(err);
//   }
// };
