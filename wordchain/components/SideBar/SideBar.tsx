import Link from 'next/link';
import { FaUsers } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { useRouter } from 'next/router';
import useWallet from '../../hooks/useWallet';

const SideBar = () => {
	const router = useRouter();
	const { disconnectWallet, web3Modal } = useWallet();
	return (
		<aside className='px-7 py-16 bg-[#040B21] h-full'>
			<Link href='/dashboard'>
				<a href='#' className='text-2xl font-bold hover:text-[#498feb]'>
					WordChain
				</a>
			</Link>
			<Link href='/dashboard/created-tournaments'>
				<a
					href='#'
					className={`flex items-center mt-16 hover:text-[#498feb] cursor-pointer ${
						router.pathname === '/dashboard/created-tournaments' &&
						'text-[#498feb]'
					}`}
				>
					<FaUsers className='text-2xl mr-4' /> Created Tournaments
				</a>
			</Link>
			<Link href='/dashboard/joined-tournaments'>
				<a
					href='#'
					className={`flex items-center mt-16 hover:text-[#498feb] cursor-pointer ${
						router.pathname === '/dashboard/joined-tournaments' &&
						'text-[#498feb]'
					}`}
				>
					<FaUsers className='text-2xl mr-4' /> Joined Tournaments
				</a>
			</Link>
			<Link href='/dashboard/all-tournaments'>
				<a
					href='#'
					className={`flex items-center mt-16 hover:text-[#498feb] cursor-pointer ${
						router.pathname === '/dashboard/all-tournaments' && 'text-[#498feb]'
					}`}
				>
					<FaUsers className='text-2xl mr-4' /> All Tournaments
				</a>
			</Link>
			<button
				className='flex items-center mt-16 hover:text-[#498feb] cursor-pointer'
				onClick={() => disconnectWallet(web3Modal, router)}
			>
				<BiLogOut className='text-2xl mr-4' /> Logout
			</button>
		</aside>
	);
};

export default SideBar;
