import { ethers } from "ethers";
import Coverage from "./Coverage.json";


const CoverageAddress = "0xFEe1C02B91Fd7e846962E9e9336E4D7082420E11";
const CoverageAbi = Coverage.abi;


export const createCoverageContract = () =>
{
    if ( typeof window.ethereum !== 'undefined' )
    {
        const provider = new ethers.providers.Web3Provider( window.ethereum );
        const signer = provider.getSigner();
        const transactionsContract = new ethers.Contract( CoverageAddress, CoverageAbi, signer );

        return transactionsContract;
    }
   
    
};