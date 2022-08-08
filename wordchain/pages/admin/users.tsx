import React, { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { ImSpinner9 } from 'react-icons/im';
import AdminPageLayout from '../../components/AdminPageLayout/AdminPageLayout';
import { NotificationType } from '../../constants';
import showToast from '../../helpers/showToast';
import useWallet from '../../hooks/useWallet';

const Users = () => {
	const { users, wordChainContract, address } = useWallet();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (users) {
			setTimeout(() => {
				setLoading(false);
			}, 2500);
		}
		//eslint-disable-next-line
	}, [users]);

	const handleBlackList = async (addressToBlackList: any) => {
		setLoading(true);
		try {
			await wordChainContract.methods
				.blackListAddress(addressToBlackList)
				.send({ from: address });
		} catch (error) {
			showToast((error as Error).message, NotificationType.ERROR);
		}
		setLoading(false);
	};
	return (
		<AdminPageLayout>
			<div className='grid  gap-12 mb-12'>
				<div className='drop-shadow-lg'>
					<h2 className='text-2xl mb-8 mt-12'>Users</h2>
					{loading ? (
						<div className='flex justify-center items-center flex-col'>
							<ImSpinner9 className='animate-spin text-5xl' />
							<p className='mt-8'>Fetching Users...</p>
						</div>
					) : users && users.length > 0 ? (
						<table className='table-auto w-full'>
							<thead>
								<tr className='border-b-2 text-xl'>
									<th className=''>Username</th>
									<th className=''>Wallet Address</th>
									<th className=' whitespace-nowrap'>isBlackListed</th>
									<th>Blacklist</th>
								</tr>
							</thead>

							<tbody className=' mt-8'>
								{users.map((user: any, index: number) => (
									<tr
										key={index}
										className='border-b-2 h-16 hover:bg-gray-200 text-gray-600 text-center'
									>
										<td className='text-[#0E1027]'>{user.username}</td>
										<td className='text-[#0E1027]'>{user.address}</td>
										<td className='text-[#0E1027]'>
											{user.isBlackListed ? 'Yes' : 'No'}
										</td>
										<td>
											<button
												onClick={() => handleBlackList(user.address)}
												className='border whitespace-nowrap border-[#0E1027] px-4 py-1 bg-[#0E1027] text-white w-48 rounded-md uppercase'
											>
												{loading ? (
													<>
														<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
														BlackListing...
													</>
												) : (
													<>
														BlackList User
													</>
												)}
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<>There are no users yet...</>
					)}
				</div>
			</div>
		</AdminPageLayout>
	);
};

export default Users;
