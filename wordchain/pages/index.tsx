import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import showToast from '../helpers/showToast';
import useAlert from '../hooks/useAlert';
import useWallet from '../hooks/useWallet';

export interface IAlert {
	id: number;
	message: string;
	type: string;
	timeout?: string;
}

const Home: NextPage = () => {
	const {
		connectWallet,
		monitorAccountChanged,
		monitorDisconnect,
		provider,
		loadContract,
		adminContract,
		web3,
		address,
		checkIfAdmin,
		isAdmin,
	} = useWallet();
	const router = useRouter();
	const { alerts } = useAlert();

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

	//monitior account changed and monitor disconnect
	useEffect(() => {
		let mounted = true;

		if (mounted && provider !== null) {
			monitorAccountChanged(provider);
			monitorDisconnect(provider);
		}
		return () => {
			mounted = false;
		};
		//eslint-disable-next-line
	}, [provider]);

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

	return (
		<>
			<div className='flex justify-between items-center px-4 lg:px-48 py-4'>
				<Link href='#'>
					<a className='font-bold text-[32px]'>
						<span>Word</span>
						<span>Chain</span>
					</a>
				</Link>
				<button
					onClick={() => connectWallet(router)}
					className='border border-[#0E1027] p-3 bg-[#0E1027] text-white w-32 rounded-md uppercase'
				>
					connect
				</button>
			</div>
			<HeroSection />
		</>
	);
};

export default Home;
