import { ethers } from "ethers";
import { TOWOBO_CONTRACT } from "./metadata";

const getSigner = async () => {
  let signer;
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  return signer;
};

export const getPrimaryAccount = async () => {
  let provider;
  if (window.ethereum) {
    await window.ethereum.enable();
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } else {
    return undefined; // No supported account detected.
  }

  const accounts = await provider.listAccounts();
  return accounts[0];
};


export async function deployContract(title, signerAddress) {
  const signer = await getSigner();

 
  const factory = new ethers.ContractFactory(
    TOWOBO_CONTRACT.abi,
    TOWOBO_CONTRACT.bytecode,
    signer
  );

  const validatedAddress = ethers.utils.getAddress(signerAddress);

  
  const contract = await factory.deploy(title, validatedAddress);
  await contract.deployed();
  console.log("Contract deployed to address:", contract.address);
  return contract;
}

export const validAddress = (addr) => {
  try {
    ethers.utils.getAddress(addr);
    return true;
  } catch (e) {
    return false;
  }
};

export const markContractCompleted = async (contractAddress, signatureUrl) => {
  if (!contractAddress || !signatureUrl) {
    return {};
  }
  const signer = await getSigner();
  const towoboContract = new ethers.Contract(
    contractAddress,
    TOWOBO_CONTRACT.abi,
    signer
  );
  const result = await towoboContract.markCompleted(signatureUrl);
  return result;
};
