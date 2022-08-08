import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ImSpinner9 } from 'react-icons/im';
import React, { useEffect, useState } from 'react';
import AdminPageLayout from '../../../../components/AdminPageLayout/AdminPageLayout';
import useWallet from '../../../../hooks/useWallet';
import Moment from 'react-moment';

const SingleTournamentPage = ({ id }: any) => {
	const { fetchAllPlayers, wordChainContract, tournaments, players } =
		useWallet();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (wordChainContract !== null) {
			fetchAllPlayers(wordChainContract, id);
		}
		//eslint-disable-next-line
	}, [wordChainContract]);

	useEffect(() => {
		if (tournaments) {
			setTimeout(() => {
				setLoading(false);
			}, 2500);
		}
		//eslint-disable-next-line
	}, [tournaments]);
	const router = useRouter();
	return (
		<AdminPageLayout>
			<div className='w-[900px] mx-auto'>
			{loading ? (
						<div className='flex justify-center items-center flex-col mt-24'>
							<ImSpinner9 className='animate-spin text-5xl' />
							<p className='mt-8'>Fetching Tournament Data</p>
						</div>
					) :
				(<><div className='mt-16 mr-4 pl-10'>
					<h3 className='text-7xl text-center mb-8 drop-shadow-sm'>
						{tournaments && tournaments[id].name}
					</h3>
					<p className='text-center'>
						{tournaments && tournaments[id].description}
					</p>
					<p className='text-center'>
						Number of Participants: <span>{players && players.length}</span>
					</p>
					<p className='text-center'>Total Stake: <span className= 'font-bold'>{tournaments[0].totalStake} WCT</span></p>
					
				</div>
				<div className='flex items-center justify-between text-[0.8rem]'>
					<p>Minimum Stake: {tournaments[id].minimumStakeAmount} WCT</p>
					<p>Deadline: <Moment unix format='YYYY-MM-DD HH:mm UTC'>
						{Number(tournaments[id].deadline) - 3600}
					</Moment>
					</p>
				</div>
				{players ? (
					<table className='table-auto mt-8 w-full '>
						<thead>
							<tr className='border-b-2 text-4xl'>
								<th className='w-[10%]'>S/N</th>
								<th className='w-1/2'>Username</th>
								<th className='w-1/5'>Score</th>
								<th className='w-1/5 whitespace-nowrap'>Games Played</th>
							</tr>
						</thead>

						<tbody className='text-xl '>
							{players &&
								players
								.sort((a: any, b: any) => b.gamesPlayed - a.gamesPlayed)
									.sort((a: any, b: any) => b.score - a.score)
									
									.map((player: any, index: any) => (
										<tr
											key={index}
											className='border-b-2 h-16 hover:bg-gray-200 text-gray-600 text-center'
										>
											<td className='text-[#0E1027]'>{index + 1}</td>
											<td className='text-[#0E1027]'>{player.username}</td>
											<td className='text-[#0E1027]'>{player.score.toFixed(2)}</td>
											<td className='text-[#0E1027]'>{player.gamesPlayed}</td>
										</tr>
									))}
						</tbody>
					</table>
				) : (
					<div>There are currently no players...</div>
				)}</>)}
				
			</div>
		</AdminPageLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	query: { id },
}) => {
	return {
		props: {
			id,
		},
	};
};

export default SingleTournamentPage;
