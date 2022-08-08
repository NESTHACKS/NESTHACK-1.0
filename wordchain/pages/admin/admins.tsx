import React, { useEffect, useState } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import AdminPageLayout from '../../components/AdminPageLayout/AdminPageLayout';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar';
import useWallet from '../../hooks/useWallet';

const Admins = () => {
	const { users, admins, web3 } = useWallet();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (admins) {
			setTimeout(() => {
				setLoading(false);
			}, 2500);
		}
		//eslint-disable-next-line
	}, [admins]);

	return (
		<AdminPageLayout>
			<div className='grid  gap-12 mb-12'>
				<div className='drop-shadow-lg'>
					<h2 className='text-2xl mb-8 mt-12'>Admins</h2>
					{loading ? (
						<div className='flex justify-center items-center flex-col'>
							<ImSpinner9 className='animate-spin text-5xl' />
							<p className='mt-8'>Fetching Admins...</p>
						</div>
					) : admins && admins.length > 0 ? (
						<table className='table-auto w-full'>
							<thead>
								<tr className='border-b-2 text-xl'>
									<th className=''>Wallet Address</th>
									<th className=' whitespace-nowrap'>actions</th>
								</tr>
							</thead>

							<tbody className='mt-8'>
								{admins.map((admin: any, index: number) => (
									<tr
										className='border-b-2 h-16 hover:bg-gray-200 text-gray-600 text-center'
										key={index}
									>
										<td className=''>{admin}</td>
										<td>
											<button className='border whitespace-nowrap border-[#0E1027] px-4 py-1 bg-[#0E1027] text-white w-48 rounded-md uppercase'>
												remove admin
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<>There are no admins yet...</>
					)}
				</div>
			</div>
		</AdminPageLayout>
	);
};

export default Admins;
