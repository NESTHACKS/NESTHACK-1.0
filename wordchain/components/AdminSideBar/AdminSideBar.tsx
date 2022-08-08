import Link from 'next/link';
import { FaUsers } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { useRouter } from 'next/router';
import useWallet from '../../hooks/useWallet';

const AdminSideBar = () => {
	const router = useRouter();
	const { web3Modal, disconnectWallet } = useWallet();
	return (
		<aside className='px-7 py-16 bg-[#040B21] h-full'>
			<Link href='/admin'>
				<a href='#' className='text-2xl font-bold hover:text-[#498feb]'>
					WordChain
				</a>
			</Link>
			<Link href='/admin/tournaments'>
				<a
					href='#'
					className={`flex items-center mt-16 hover:text-[#498feb] cursor-pointer ${
						router.pathname === '/admin/tournaments' && 'text-[#498feb]'
					}`}
				>
					<FaUsers className='text-2xl mr-4' /> Tournaments
				</a>
			</Link>
			<Link href='/admin/users'>
				<a
					href='#'
					className={`flex items-center mt-16 hover:text-[#498feb] cursor-pointer ${
						router.pathname === '/admin/users' && 'text-[#498feb]'
					}`}
				>
					<FaUsers className='text-2xl mr-4' /> Users
				</a>
			</Link>
			<Link href='/admin/admins'>
				<a
					href='#'
					className={`flex items-center mt-16 hover:text-[#498feb] cursor-pointer ${
						router.pathname === '/admin/admins' && 'text-[#498feb]'
					}`}
				>
					<FaUsers className='text-2xl mr-4' /> Admins
				</a>
			</Link>
			<Link href='/admin/advanced-options'>
				<a
					href='#'
					className={`flex items-center mt-16 hover:text-[#498feb] cursor-pointer ${
						router.pathname === '/admin/advanced-options' && 'text-[#498feb]'
					}`}
				>
					<FaUsers className='text-2xl mr-4' /> Advanced Options
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

export default AdminSideBar;
