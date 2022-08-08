import React, { useEffect, useState } from 'react';
import AdminPageLayout from '../../components/AdminPageLayout/AdminPageLayout';
import AdminCard from '../../components/Tournament/AdminCard';
import useWallet from '../../hooks/useWallet';
import useAlert from '../../hooks/useAlert';
import { NotificationType } from '../../constants';
import { useRouter } from 'next/router';
const AdminPage = () => {
	const { users, tournaments, wordChainContract, fetchAllPlayers, address } = useWallet();
	const [blackListedUsers, setBlackListedUsers] = useState();
	const [pendingPayout, setPendingPayouts] = useState([]);
	const [average, setAverage] = useState(0);
	const { setAlert } = useAlert();
	const router = useRouter();

	useEffect(() => {
		if (users && users.length > 0) {
			const data =
				users && users.filter((user: any) => user.isBlacklisted === true);
			setBlackListedUsers(data.length);
		}

		//eslint-disable-next-line
	}, [users]);

	const findAveragePlayers = (arr: any) => {
		const { length } = arr;
		return arr.reduce((acc: any, val: any) => {
			return acc + val.numberOfParticipants / length;
		}, 0);
	};

	useEffect(() => {
		if (tournaments && tournaments.length > 0) {
			const average = findAveragePlayers(tournaments);
			setAverage(average);
			const pendingPayouts = tournaments.filter(
				(tournament: any) =>
					Number(tournament.deadline) < new Date().getTime()/1000 && Number(tournament.totalStake) > 0
			);
			setPendingPayouts(pendingPayouts);
		}

		//eslint-disable-next-line
	}, [tournaments]);

	const handlePayout = async (tournament: any) => {

		try {
			let res_ = await wordChainContract.methods.getTournamentPlayers(tournament.id).call();
			let res: any[] = [];
			res_.filter((t:any) => Number(t.gamesPlayed) > 0).map((dat: any) => {
				let item: any = {};
				item.id = dat.id;
				item.username = dat.username;
				item.score =
					Number(dat.gamesPlayed) === 0
						? 0
						: Number(dat.score) / Number(dat.gamesPlayed);
				item.gamesPlayed = Number(dat.gamesPlayed);
				item.address = dat.add_;
				res.push(item);
			});
			
			if (res.length === 0) {alert("No player in this tournament"); return;}
			
			let worthy = res.filter((r: any) => r.gamesPlayed >= 20);
			let playerstoReward: any[];

			if (worthy.length === 0) {
				if(res.length === 1) playerstoReward = res.map((t: any) => t.add_);
				else if (res.length === 2) {
					let test = res.sort((a: any, b: any)=> b.score - a.score)
						.map((t: any) => t.add_);
					playerstoReward = test;
					playerstoReward.push(test[1]);
				}
				else playerstoReward = res.sort((a: any, b: any)=> b.score - a.score)
					.map((t: any) => t.add_).slice(0, 3);
				
			} else if (worthy.length === 1) {
				playerstoReward = Array.from({length: 3}).fill(worthy.map((t: any) => t.add_)[0]);
				
			} else if (worthy.length === 2) {
				let test = worthy.sort((a: any, b: any) => b.score - a.score)
					.map((t: any) => t.add_);
				playerstoReward = test;
				playerstoReward.push(test[1]);
			} else {
				playerstoReward = worthy.sort((a: any, b: any) => b.score - a.score)
					.map((t: any) => t.add_).slice(0,3);
			}
			
			await wordChainContract.methods.dispatchRewards(tournament.id, playerstoReward[0], playerstoReward[1], playerstoReward[2])
				.send({from: address});
		} catch(error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	}

	return (
		<AdminPageLayout>
			<div className='mt-16 mr-4 h-[500px]'>
				<h3 className='text-4xl drop-shadow-sm mt-16'>Summary</h3>
				<p className='mb-8'>Here is a breakdown of what is going on.</p>
				<div className='h-[250px] w-full grid grid-cols-4 gap-4'>
					<AdminCard
						tournament={{
							item: 'Users',
							amount: users && users.length ? users.length : 0,
						}}
						route={'users'}
					/>
					<AdminCard
						tournament={{
							item: 'Tournaments',
							amount:
								tournaments && tournaments.length ? tournaments.length : 0,
						}}
						route={'tournaments'}
					/>
					<AdminCard
						tournament={{
							item: 'BlackListed Users',
							amount: blackListedUsers ? blackListedUsers : 0,
						}}
						route={'users'}
					/>
					<AdminCard
						tournament={{
							item: 'Average Players Per Tournament',
							amount: average ? average.toFixed(0) : 0,
						}}
						route={'tournaments'}
					/>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-12 mb-12'>
				<div className='drop-shadow-lg'>
					<h2 className='text-2xl mb-8 mt-12'>Tournaments Pending Payout</h2>
					{pendingPayout.length > 0 ? (
						<table className='table-auto w-full'>
							<thead>
								<tr className='border-b-2 text-xl'>
									<th className='w-1/5'>Name</th>
									<th className='w-1/5'>Total Stake</th>
									<th className='w-1/5 whitespace-nowrap'>Actions</th>
								</tr>
							</thead>
							<tbody className='mt-8'>
								{pendingPayout &&
									pendingPayout.map((tournament: any, index: number) => (
										<tr
											key={index}
											onClick= {() => router.push(`/admin/tournaments/${tournament.id}`)}
											className='border-b-2 h-16 hover:bg-gray-200 text-gray-600 text-center'
										>
											<td className='text-[#0E1027]'>{tournament.name}</td>
											<td className='text-[#0E1027]'>
												{tournament.totalStake} WCT
											</td>
											<td className='text-[#0E1027]'>
												<button onClick={() => handlePayout(tournament)} className='border border-[#0E1027] py-1 bg-[#0E1027] text-white w-24 rounded-md uppercase'>
													PAYOUT
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					) : (
						<>No data yet...</>
					)}
				</div>

				<div className='drop-shadow-lg'>
					<h2 className='text-2xl mb-8 mt-12'>Top Tournaments</h2>
					{tournaments.length > 0 ? (
						<table className='table-auto w-full'>
							<thead>
								<tr className='border-b-2 text-xl'>
									<th className='w-1/5'>Name</th>
									<th className='w-1/5'>Total Stake</th>
									<th className='w-1/5 whitespace-nowrap'>Participants</th>
								</tr>
							</thead>
							<tbody className='mt-8'>
								{tournaments &&
									tournaments
										.sort(
											(a: any, b: any) =>
												b.numberOfParticipants - a.numberOfParticipants
										)
										.sort((a: any, b: any) => b.totalStake - a.totalStake)
										.slice(0, 5)
										.map((tournament: any, index: number) => (
											<tr
												key={index}
												className='border-b-2 h-16 hover:bg-gray-200 text-gray-600 text-center'
											>
												<td className='text-[#0E1027]'>{tournament.name}</td>
												<td className='text-[#0E1027]'>
													{tournament.totalStake} WCT
												</td>
												<td className='text-[#0E1027]'>
													{tournament.numberOfParticipants}
												</td>
											</tr>
										))}
							</tbody>
						</table>
					) : (
						<>No data yet...</>
					)}
				</div>
			</div>
		</AdminPageLayout>
	);
};

export default AdminPage;
