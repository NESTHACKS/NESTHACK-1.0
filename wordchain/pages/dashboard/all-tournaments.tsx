import { range } from 'lodash';
import React, { useEffect, useState } from 'react';
import BasePageLayout from '../../components/BasePageLayout/BasePageLayout';
import CardSkeleton from '../../components/skeletons/CardSkeleton';
import Card from '../../components/Tournament/Card';
import useWallet from '../../hooks/useWallet';

const AllTournamentsPage = () => {
	const { tournaments } = useWallet();
	const [loading, setLoading] = useState<boolean>(true);

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
				<h3 className='text-4xl drop-shadow-sm mt-16'>All Tournaments</h3>
				<p className='mb-8'>These are all the tournaments on wordchain.</p>
				<div className='h-[300px] w-full grid lg:grid-cols-3 gap-4'>
					{loading ? (
						range(6).map((data, index) => <CardSkeleton key={index} />)
					) : tournaments && tournaments.length > 0 ? (
						tournaments.map((tournament: any, index: any) => (
							<Card tournament={tournament} key={index} />
						))
					) : (
						<>There are no tournaments yet...</>
					)}
				</div>
			</div>
		</BasePageLayout>
	);
};

export default AllTournamentsPage;
