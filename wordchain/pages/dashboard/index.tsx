import React, { useEffect, useState } from 'react';
import { cursorTo } from 'readline';
import BasePageLayout from '../../components/BasePageLayout/BasePageLayout';
import BannerCardSkeleton from '../../components/skeletons/BannerCardSkeleton';
import CardSkeleton from '../../components/skeletons/CardSkeleton';
import Card from '../../components/Tournament/Card';
import useWallet from '../../hooks/useWallet';
import Modal from '../../components/Modal/Modal';
import { range } from 'lodash';
import WithdrawToken from '../../components/modals/WithdrawToken';
const DashboardPage = () => {
	const { tournaments } = useWallet();
	const [hottestTournament, setHottestTournament] = useState<any>();
	const [loading, setLoading] = useState<boolean>(true);
	const [withdraw, setWithdraw] = useState<boolean>(false);

	useEffect(() => {
		if (tournaments !== null) {
			let res = tournaments.reduce((acc: any, cur: any, idx: any) => {
				return tournaments[acc].numberOfParticipants > cur.numberOfParticipants
					? acc
					: idx;
			}, 0);
			console.log(res);
			setHottestTournament(tournaments[res]);
		}
	}, [tournaments]);

	useEffect(() => {
		if (tournaments) {
			setTimeout(() => {
				setLoading(false);
			}, 2500);
		}
		//eslint-disable-next-line
	}, [tournaments]);
	return (
		<BasePageLayout>
			<div className='mt-16 mr-4'>
				<div>
					
				</div>
				<div className='flex items-center justify-between'>
					<h3 className='text-4xl mb-8 drop-shadow-sm'>
						Hottest Live Tournament
					</h3>
					<button
						onClick={() => setWithdraw(true)}
						className='border whitespace-nowrap mr-4 border-[#0E1027] p-3 bg-[#0E1027] text-white w-48 rounded-md uppercase text-8'
					>
						withdraw wct
					</button>
				</div>
				
				<div className='h-[300px] mb-4 grid '>
					{loading ? (
						<BannerCardSkeleton />
					) : (
						tournaments &&
						tournaments.length > 0 && <Card tournament={hottestTournament} />
					)}
				</div>
				<h3 className='text-4xl drop-shadow-sm mt-16'>Others</h3>
				<p className='mb-8'>Join a Tournament based on your region</p>
				<div className='h-[300px] w-full grid lg:grid-cols-3 gap-4'>
					{loading ? (
						range(3).map((data, index) => <CardSkeleton key={index} />)
					) : tournaments && tournaments.length > 0 ? (
						tournaments.map((tournament: any, index: any) => (
							<Card tournament={tournament} key={index} />
						))
					) : (
						<>There are no tournaments yet...</>
					)}
				</div>
			</div>
			<Modal
				visibility={withdraw}
				toggleVisibility={setWithdraw}
			>
				<WithdrawToken setBuyToken={setWithdraw} isAdmin={false} />
			</Modal>
		</BasePageLayout>
	);
};

export default DashboardPage;
