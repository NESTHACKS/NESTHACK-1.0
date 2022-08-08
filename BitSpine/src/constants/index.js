import ABI from "./abi.json";
import COMPT_ABI from "./abi/comptroller.json";
import USDT_ABI from "./abi/usdt.json";
import CUSDT_ABI from "./abi/cusdt.json";
import CDAI from "./abi/cdia.json";
import { oracleData } from "./oracle.";
export const CONSTANTS = {
    CONTRACT_ADDRESS: "0xd6801a1dffcd0a410336ef88def4320d6df1883e",
    CONTRACT_ABI: ABI,
    COMPTROLLER_CONTRACT_ADDRESS: "0x2eaa9d77ae4d8f9cdd9faacd44016e746485bddb",
    COMPT_ABI,
    CUSDT_CA: "0x2fb298bdbef468638ad6653ff8376575ea41e768",
    USDT_CA: "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02",
    CUSDT_ABI,
    USDT_ABI,
    CDAI,
    CDAI_CA: "0x6d7f0754ffeb405d23c51ce938289d4835be3b14",
    ORACLEDATA: oracleData,
};

// CUSDT_CA: "0x6d7f0754ffeb405d23c51ce938289d4835be3b14",  cdia
