import { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import { ethers } from "ethers";
import { CONSTANTS } from "./constants";
import Loader from "./components/Loader";
import Alert from "./components/Alert";

const App = () => {
    const [currentAccount, setCurrentAccount] = useState();
    const [cethBalance, setCethBalance] = useState(0);
    const [loader, setLoader] = useState(false);
    const [reload, setReload] = useState(false);
    const [ethBal, setEthBal] = useState(0);
    const [liquidity, setLiquidity] = useState(0);
    const [msg, setMsg] = useState("");

    const { ethereum } = window;

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            console.log("MetaMask is installed!");
        } else {
            alert("Please Install Metamask");
        }
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            if (addressArray.length > 0) {
                window.sessionStorage.setItem("address", addressArray[0]);
                setCurrentAccount(addressArray[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        lunchWith();
    }, [reload]);

    const lunchWith = () => {
        if (ethereum) {
            const address = window.sessionStorage.getItem("address");
            if (address) {
                setCurrentAccount(address);
            }
            (async () => {
                // await exitMarket();
                await checkCETHBalance();
                await getEthBalance();
                await getAccountLiquity();
            })();
            // window.sessionStorage.removeItem("address");
        }
    };

    const setMessage = (text) => {
        setMsg(text || "something went wrong");
        setTimeout(() => {
            setMsg("");
        }, 5000);
    };

    const createContract = async (CA, ABI) => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const contract = new ethers.Contract(
                CONSTANTS.CONTRACT_ADDRESS,
                CONSTANTS.CONTRACT_ABI,
                signer
            );
            return { contract, address };
        } catch (error) {
            console.log({ error });
        }
    };

    const redeem = async () => {
        try {
            const { contract, address } = await createContract(
                CONSTANTS.CONTRACT_ADDRESS,
                CONSTANTS.CONTRACT_ABI
            );

            let cTokenBalance = (await contract.balanceOf(address)) / 1e8;

            setLoader(true);
            const tx = await contract.redeem(Math.trunc(cTokenBalance * 1e8), {
                from: address,
                gasLimit: ethers.utils.hexlify(250000),
                gasPrice: ethers.utils.hexValue(20000000000),
            });

            await tx.wait();
            setLoader(false);
            setReload(!reload);
        } catch (error) {
            console.log({ error });
            setLoader(false);
        }
    };
    const checkCETHBalance = async () => {
        try {
            const { contract, address } = await createContract(
                CONSTANTS.CONTRACT_ADDRESS,
                CONSTANTS.CONTRACT_ABI
            );

            let cTokenBalance = (await contract.balanceOf(address)) / 1e8;
            setCethBalance(cTokenBalance);
        } catch (error) {
            console.log(error);
        }
    };
    const getEthBalance = async (value) => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            setEthBal(ethers.utils.formatEther(balance));
        } catch (err) {
            console.log(err);
        }
    };
    const mint = async (value) => {
        try {
            const { contract, address } = await createContract(
                CONSTANTS.CONTRACT_ADDRESS,
                CONSTANTS.CONTRACT_ABI
            );

            setLoader(true);
            const tx = await contract.mint({
                from: address,
                gasLimit: ethers.utils.hexlify(250000),
                gasPrice: ethers.utils.hexValue(20000000000),
                value: ethers.utils.hexValue(ethers.utils.parseEther(value)),
            });
            await tx.wait();
            setLoader(false);
            setReload(!reload);
            return contract;
        } catch (err) {
            setLoader(false);
            setMessage();
            console.log(err);
        }
    };

    const enterMarket = async () => {
        try {
            const { contract } = await createContract(
                CONSTANTS.COMPTROLLER_CONTRACT_ADDRESS,
                CONSTANTS.COMPT_ABI
            );

            const markets = [CONSTANTS.CONTRACT_ADDRESS];

            setLoader(true);
            const tx = await contract.enterMarkets(markets, {
                gasLimit: ethers.utils.hexlify(250000),
                gasPrice: ethers.utils.hexValue(20000000000),
            });
            await tx.wait();
            setLoader(false);
            setReload(!reload);
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };

    const getAccountLiquity = async () => {
        try {
            const { contract, address } = await createContract(
                CONSTANTS.COMPTROLLER_CONTRACT_ADDRESS,
                CONSTANTS.COMPT_ABI
            );
            let { 1: tx } = await contract.getAccountLiquidity(address);
            tx = (tx / 1e18) * 50;
            setLiquidity(tx);
        } catch (error) {
            console.log(error);
        }
    };

    const borrow = async (amount) => {
        if (amount >= liquidity) {
            setMessage(
                "You dont have enough Borrow limit to perform this operation"
            );
            return;
        }
        try {
            const { contract, address } = await createContract(
                CONSTANTS.CUSDT_CA,
                CONSTANTS.CUSDT_ABI
            );
            const borrowAmount = amount * Math.pow(10, 18);
            setLoader(true);

            let tx = await contract.borrow(`${borrowAmount}`, {
                from: address,
                gasLimit: ethers.utils.hexlify(250000),
                gasPrice: ethers.utils.hexValue(20000000000),
            });
            await tx.wait();
            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };

    return (
        <div className="h-screen bg-[#011936]">
            <>{loader && <Loader />}</>
            {msg && <Alert message={msg} onClose={() => setMsg(false)} />}
            <>
                {currentAccount ? (
                    <Dashboard
                        liquidity={liquidity}
                        address={currentAccount}
                        redeem={redeem}
                        ethBal={ethBal}
                        cethBal={cethBalance}
                        mint={mint}
                        currentAccount={currentAccount}
                        enterMarket={enterMarket}
                        Borrow={borrow}
                    />
                ) : (
                    <Homepage
                        connectWallet={connectWallet}
                        currentAccount={currentAccount}
                        setCurrentAccount={setCurrentAccount}
                    />
                )}
            </>
        </div>
    );
};

export default App;
