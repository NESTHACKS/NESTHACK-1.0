import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import showToast from '../../helpers/showToast';
import useAlert from '../../hooks/useAlert';
import useWallet from '../../hooks/useWallet';
import { IAlert } from '../../pages';
import Modal from '../Modal/Modal';
import BuyToken from '../modals/BuyToken';
import SaveUser from '../modals/SaveUser';
import SideBar from '../SideBar/SideBar';
import Card from '../Tournament/Card';

const BasePageLayout = ({ children }: any) => {
	const { alerts } = useAlert();
	const {
		connectWallet,
		tokenBalance,
		address,
		loadContract,
		web3,
		balance,
		wordChainContract,
		username,
		fetchAllTournaments,
	} = useWallet();
	const router = useRouter();

	const reconnectWallet = async () => {
		await connectWallet(router);
	};

	//Handle Notifications
	useEffect(() => {
		let mounted = true;

		if (mounted && alerts.length > 0) {
			alerts.map((alert: IAlert) => showToast(alert.message, alert.type));
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [alerts]);

	//Reconnect wallet on page refresh
	useEffect(() => {
		let mounted = true;

		if (mounted && localStorage?.getItem('isWalletConnected') === 'true') {
			reconnectWallet();
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, []);

	//load contract for connected users
	useEffect(() => {
		let mounted = true;

		if (mounted && web3 !== null && address !== '' && router) {
			loadContract(web3, address, router);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [web3, address, router]);

	//check that username is valid
	useEffect(() => {
		let mounted = true;

		if (mounted && wordChainContract !== null && username === '') {
			setSaveUser(true);
		} else {
			setSaveUser(false);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [username, wordChainContract]);

	//fetch all tournaments
	useEffect(() => {
		let mounted = true;

		if (mounted && wordChainContract !== null) {
			fetchAllTournaments(wordChainContract);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [wordChainContract]);

	const [saveUser, setSaveUser] = useState(false);
	const [buyToken, setBuyToken] = useState(false);
	const [newUsername, setNewUserName] = useState('');
	const [toggleImportance, setToggleImportance] = useState(true);
	return (
		<>
			<div>
				<div className='flex'>
					<div className='hidden md:block md:bg-black md:text-white md:min-h-[150vh] w-[300px]'>
						<SideBar />
					</div>
					<div className='ml-4 tablet:ml-0 md:w-[calc(100vw-300px)]'>
						<div className='flex items-center justify-between'>
							<h3 className='mt-8 text-2xl'>
								Hello ,
								{username && (
									<span className='text-purple-700'>{username} 😌</span>
								)}
							</h3>
							<div className='mr-4 mt-4 flex lg:block'>
								<button
									onClick={() => setBuyToken(true)}
									className='border mr-4 border-[#0E1027] p-3 bg-[#0E1027] text-white w-32 rounded-md uppercase'
								>
									buy token
								</button>
								<button className='border mr-4 border-[#0E1027] p-3 text-[#0E1027]  w-32 rounded-md uppercase'>
									{Number(balance).toFixed(4)} ETH
								</button>
								<button className='border border-[#0E1027] p-3 text-[#0E1027]  w-32 rounded-md uppercase'>
									{Number(tokenBalance).toFixed(4)} WCT
								</button>
							</div>
						</div>
						{children}
					</div>
				</div>
			</div>
			<Modal
				visibility={saveUser}
				toggleVisibility={setSaveUser}
				isImportant={toggleImportance}
			>
				<SaveUser
					setSaveUser={setSaveUser}
					newUsername={newUsername}
					setNewUserName={setNewUserName}
					setToggleImportance={setToggleImportance}
				/>
			</Modal>
			<Modal visibility={buyToken} toggleVisibility={setBuyToken}>
				<BuyToken setBuyToken={setBuyToken} />
			</Modal>
		</>
	);
};

export default BasePageLayout;
