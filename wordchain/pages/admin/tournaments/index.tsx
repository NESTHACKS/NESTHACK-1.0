import React, { useEffect, useState } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import AdminPageLayout from '../../../components/AdminPageLayout/AdminPageLayout';
import Modal from '../../../components/Modal/Modal';
import CreateTournament from '../../../components/modals/CreateTournament';
import useWallet from '../../../hooks/useWallet';
import moment from 'moment';
import Moment from 'react-moment';
import { useRouter } from 'next/router';

const Tournaments = () => {
	const [createTournament, setCreatedTournament] = useState<boolean>(false);
	const { tournaments, web3 } = useWallet();
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		if (tournaments) {
			setTimeout(() => {
				setLoading(false);
			}, 2500);
		}
		//eslint-disable-next-line
	}, [tournaments]);
	return (
		<AdminPageLayout>
			<div className='grid  gap-12 mb-12'>
				<div className='drop-shadow-lg'>
					<div className='flex items-center justify-between'>
						<div>
							<h2 className='text-2xl mb-8 mt-12'>Tournaments</h2>
						</div>
						<button
							onClick={() => setCreatedTournament(true)}
							className='border whitespace-nowrap mr-4 border-[#0E1027] p-3 bg-[#0E1027] text-white w-48 rounded-md uppercase'
						>
							create tournament
						</button>
					</div>
					
					{loading ? (
						<div className='flex justify-center items-center flex-col'>
							<ImSpinner9 className='animate-spin text-5xl' />
							<p className='mt-8'>Fetching Tournaments...</p>
						</div>
					) : tournaments && tournaments.length > 0 ? (
						<table className='table-auto w-full'>
							<thead>
								<tr className='border-b-2 text-xl'>
									<th className=''>Name</th>
									<th className=''>Description</th>
									<th className=' whitespace-nowrap'>Number Of Participants</th>
									<th className=' whitespace-nowrap'>Minimum Stake</th>
									<th className=' whitespace-nowrap'>Total Stake</th>
									<th className=' whitespace-nowrap'>Mode</th>
									<th className=' whitespace-nowrap'>Deadline</th>
								</tr>
							</thead>

							<tbody className=' mt-8'>
								{tournaments.map((tournament: any, index: number) => (
									<tr
										key={index}
										onClick= {()=> router.push(`/admin/tournaments/${tournament.id}`)}
										className='border-b-2 h-16 hover:bg-gray-200 text-gray-600 text-center cursor-pointer'
									>
										<td className='text-[#0E1027]'>{tournament.name}</td>
										<td className='text-[#0E1027]'>{tournament.description}</td>
										<td className='text-[#0E1027]'>
											{tournament.numberOfParticipants}
										</td>
										<td className='text-[#0E1027]'>
											{tournament.minimumStakeAmount} WCT
										</td>
										<td className='text-[#0E1027]'>
											{tournament.totalStake} WCT
										</td>
										<td className='text-[#0E1027]'>
											{tournament.isPrivate ? 'Private' : 'Public'}
										</td>
										<td className='text-[#0E1027]'>
											<Moment unix format='YYYY-MM-DD HH:mm'>
												{tournament.deadline}
											</Moment>{' '}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<>There are no tournaments yet...</>
					)}
				</div>
			</div>
			<Modal
				visibility={createTournament}
				toggleVisibility={setCreatedTournament}
			>
				<CreateTournament setCreatedTournament={setCreatedTournament} isAdmin={true} />
			</Modal>
		</AdminPageLayout>
	);
};

export default Tournaments;
