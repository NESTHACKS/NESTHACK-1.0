import { ethers } from "ethers";
import USDCKOVAN from "./USDCKOVAN.json";


const USDCKOVANAddress = "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede";
const USDCKOVANAbi = USDCKOVAN.abi;


export const createUSDCKOVANContract = () =>
{
    if ( typeof window.ethereum !== 'undefined' )
    {
        const provider = new ethers.providers.Web3Provider( window.ethereum );
        const signer = provider.getSigner();
        const transactionsContract = new ethers.Contract( USDCKOVANAddress, USDCKOVANAbi, signer );

        return transactionsContract;
    }
   
    
};