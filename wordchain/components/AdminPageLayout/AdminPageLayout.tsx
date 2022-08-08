import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import showToast from '../../helpers/showToast';
import useAlert from '../../hooks/useAlert';
import useWallet from '../../hooks/useWallet';
import { IAlert } from '../../pages';
import AdminSideBar from '../AdminSideBar/AdminSideBar';

const AdminPageLayout = ({ children }: any) => {
	const { alerts } = useAlert();
	const {
		connectWallet,
		address,
		loadContract,
		web3,
		balance,
		wordChainContract,
		stakingContract,
		fetchAllUsers,
		adminContract,
		fetchAdmins,
		fetchAllTournaments,
		fetchContractTokenBalance,
		fetchContractEthBalance,
		contractEthBalance,
		contractTokenBalance,
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

	//fetch all tournaments and users
	useEffect(() => {
		let mounted = true;

		if (mounted && wordChainContract !== null) {
			fetchAllTournaments(wordChainContract);
			fetchAllUsers(wordChainContract);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [wordChainContract]);

	useEffect(() => {
		let mounted = true;

		if (mounted && adminContract !== null) {
			fetchAdmins(adminContract);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [adminContract]);

	useEffect(() => {
		let mounted = true;

		if (mounted && stakingContract !== null) {
			fetchContractEthBalance(stakingContract);
			fetchContractTokenBalance(stakingContract);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [stakingContract]);

	return (
		<>
			<div>
				<div className='flex'>
					<div className='hidden md:block md:bg-black md:text-white md:min-h-[100vh] w-[300px]'>
						<AdminSideBar />
					</div>
					<div className='ml-4 tablet:ml-0 md:w-[calc(100vw-300px)]'>
						<div className='flex items-center justify-between'>
							<h3 className='mt-8 text-2xl'>
								Hello ,<span className='text-purple-700'>admin 😌</span>
							</h3>
							<div className='mr-4 mt-4 lg:block'>
								<p>Contract Tokens</p>
								<button className='border mr-4 border-[#0E1027] p-3 text-[#0E1027]  w-48 rounded-md uppercase'>
									{Number(contractTokenBalance).toFixed(2)} WCT
								</button>
							</div>
							<div className='mr-4 mt-4 lg:block'>
								<p>Contract ETH</p>
								<button className='border mr-4 border-[#0E1027] p-3 text-[#0E1027]  w-48 rounded-md uppercase'>
									{Number(contractEthBalance).toFixed(4)} ETH
								</button>
							</div>
							<div className='mr-4 mt-4 flex lg:block'>
								<button className='border mr-4 border-[#0E1027] p-3 text-[#0E1027]  w-32 rounded-md uppercase'>
									{Number(balance).toFixed(4)} ETH
								</button>
							</div>
						</div>
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminPageLayout;
