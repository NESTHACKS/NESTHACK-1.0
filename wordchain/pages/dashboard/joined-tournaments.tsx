import { range } from 'lodash';
import React, { useEffect, useState } from 'react';
import BasePageLayout from '../../components/BasePageLayout/BasePageLayout';
import SideBar from '../../components/SideBar/SideBar';
import CardSkeleton from '../../components/skeletons/CardSkeleton';
import Card from '../../components/Tournament/Card';
import useWallet from '../../hooks/useWallet';

const JoinedTournamentsPage = () => {
	const [loading, setLoading] = useState<boolean>(true);

	const {
		fetchJoinedTournaments,
		address,
		wordChainContract,
		web3,
		joinedTournaments,
	} = useWallet();
	useEffect(() => {
		if (wordChainContract !== null) {
			fetchJoinedTournaments(wordChainContract, address, web3);
		}
		//eslint-disable-next-line
	}, [wordChainContract]);
	useEffect(() => {
		if (joinedTournaments) {
			setTimeout(() => {
				setLoading(false);
			}, 2500);
		}
		//eslint-disable-next-line
	}, [joinedTournaments]);
	return (
		<BasePageLayout>
			<div className='mt-16 mr-4'>
				<h3 className='text-4xl drop-shadow-sm mt-16'>Joined Tournaments</h3>
				<p className='mb-8'>These are tournaments that you have joined.</p>
				<div className='h-[300px] w-full grid lg:grid-cols-3 gap-4'>
					{loading ? (
						range(6).map((data, index) => <CardSkeleton key={index} />)
					) : joinedTournaments && joinedTournaments.length > 0 ? (
						joinedTournaments.map((tournament: any, index: any) => (
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

export default JoinedTournamentsPage;
