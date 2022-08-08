import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BasePageLayout from '../../../../components/BasePageLayout/BasePageLayout';
import useWallet from '../../../../hooks/useWallet';
import { ImSpinner9 } from 'react-icons/im';
import Moment from 'react-moment';

const SingleTournamentPage = ({ id }: any) => {
	const [tournament_, setTournament_] = useState({
		name: "", 
		description: "", 
		totalStake: 0, 
		deadline: 3601,
		minimumStakeAmount: 0,
	});
	const [loading, setLoading] = useState(true);
	const { fetchAllPlayers, fetchAllTournaments, wordChainContract, tournaments, players } =
		useWallet();

	useEffect(() => {
		if (wordChainContract !== null) {
			fetchAllPlayers(wordChainContract, id);
		}
		//eslint-disable-next-line
	}, [wordChainContract]);

	useEffect(() => {
		if (tournaments.length !== 0) {
			setLoading(false);
			setTournament_(tournaments.filter((t: any) => t.id === id)[0]);
		}
		//eslint-disable-next-line
	}, [tournaments]);
	const router = useRouter();
	return (
		<BasePageLayout>
			<div className='w-[900px] mx-auto'>
				{!loading ? <><div className='mt-16 mr-4 pl-10'>
					<h3 className='text-7xl text-center mb-8 drop-shadow-sm'>
						{tournament_.name}
					</h3>
					<p className='text-center'>
						{tournament_.name}
					</p>
					<p className='text-center'>
						Number of Participants: <span>{players && players.length}</span>
					</p>
					<p className='text-center'>Total Stake: <span className= 'font-bold'>{tournament_.totalStake} WCT</span></p>
					
				</div>
				<div className='flex items-center justify-between text-[0.8rem]'>
					<p>Minimum Stake: {tournament_.minimumStakeAmount} WCT</p>
					<p>Deadline: <Moment unix format='YYYY-MM-DD HH:mm UTC'>
						{Number(tournament_.deadline) - 3600}
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
				)}
				<button
					onClick={() => {
						router.push('/dashboard/game/play');
					}}
					className='border mt-8 border-[#0E1027] p-3 bg-[#0E1027] text-white w-32 rounded-md uppercase'
				>
					start game
				</button></> : <ImSpinner9 className='animate-spin h-16 w-16 mr-auto ml-auto mt-48' />}
			</div>
		</BasePageLayout>
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
