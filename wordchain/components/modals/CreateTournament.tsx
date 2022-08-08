import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Dialog } from '@headlessui/react';
import { ImSpinner9 } from 'react-icons/im';
import useWallet from '../../hooks/useWallet';
import showToast from '../../helpers/showToast';
import { v4 as uuidv4 } from 'uuid';
import convertToWei from '../../helpers/convertToWei';
import { NotificationType } from '../../constants';

const CreatedTournament = ({ setCreatedTournament, isAdmin, setHasStartedJoin }: any) => {
	const {
		wordChainContract,
		tokenContract,
		tokenBalance,
		stakingContract,
		address,
		web3,
	} = useWallet();
	const [loading, setLoading] = useState<boolean>(false);
	const { createTournament } = useWallet();
	const [isPrivate, setIsPrivate] = useState(false);
	const [hasApproved, setHasApproved] = useState(false);
	const [hasStaked, setHasStaked] = useState(false);
	const [hasCreated, setHasCreated] = useState(false);
	const [tournament, setTournament] = useState({
		name: '',
		description: '',
		duration: '',
		stake: '',
		tournamentKey: uuidv4(),
	});

	const handleApprove = async () => {
		const hasEmptyFields = Object.values(tournament).some(
			element => element === ''
		);

		if (hasEmptyFields) {
			return showToast('Please fill in all fields', 'error');
		}

		
		const { stake } = tournament;
		if (Number(tokenBalance) < Number(stake)) return showToast('Insufficent tokens', 'error');

		setLoading(true);
		try {
			await tokenContract.methods
				.approve(stakingContract._address, convertToWei(web3, stake))
				.send({ from: address });
			setHasStartedJoin(true);
			setHasApproved(true);
			showToast('Approved', NotificationType.SUCCESS);
		} catch (error) {
			setLoading(false);
			showToast((error as Error).message, NotificationType.ERROR);
		}

		setLoading(false);
	};

	const handleStake = async () => {
		const hasEmptyFields = Object.values(tournament).some(
			element => element === ''
		);

		if (hasEmptyFields) {
			return showToast('Please fill in all fields', 'error');
		}

		const { stake, tournamentKey } = tournament;
		if (Number(tokenBalance) < Number(stake)) return showToast('Insufficent tokens', 'error');

		setLoading(true);
		try {
			await stakingContract.methods
				.stakeToken(stake, tournamentKey)
				.send({ from: address });
			setHasStaked(true);
			showToast('Staked', NotificationType.SUCCESS);
		} catch (error) {
			setLoading(false);
			showToast((error as Error).message, NotificationType.ERROR);
		}

		setLoading(false);
	};

	const handleCreate = async () => {
		const hasEmptyFields = Object.values(tournament).some(
			element => element === ''
		);

		if (hasEmptyFields) {
			return showToast('Please fill in all fields', 'error');
		}

		const { stake, tournamentKey, name, duration, description } = tournament;
		// if (tokenBalance < stake) return showToast('Insufficent tokens', 'error');

		setLoading(true);
		try {
			await createTournament(
				wordChainContract,
				name,
				description,
				Number(duration)*60*24,
				stake,
				isPrivate,
				tournamentKey,
				address
			);
			isAdmin ? setCreatedTournament(false) : setHasCreated(true);
		} catch (error) {
			setLoading(false);
			showToast((error as Error).message, NotificationType.ERROR);
		}

		setLoading(false);
	};

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setTournament({ ...tournament, [name]: value });
	};

	return (
		<div className='flex flex-col justify-center items-center'>
			{hasCreated ? (
				isPrivate ? <p className='text-center text-[0.8rem]'>Copy your Tournament ID and share it with your friends to join your private tournament.<br/>
				{tournament.tournamentKey}</p> : <p>Tournament created.</p>
			) : (<><Dialog.Title
				as='h4'
				className='mb-4 text-[2rem] tablet:text-xl font-bold mt-8'
			>
				Create Tournament
			</Dialog.Title>
			<div className='w-full'>
				<input
					placeholder='name of tournament'
					className='text-black p-5 border border-gray-300 rounded-md w-full mb-4 focus:border-black focus:outline-black'
					type='text'
					name='name'
					value={tournament.name}
					onChange={handleChange}
				/>
			</div>
			<div className='w-full'>
				<input
					placeholder='description of tournament'
					className='text-black p-5 border border-gray-300 rounded-md w-full mb-4 focus:border-black focus:outline-black'
					type='text'
					name='description'
					value={tournament.description}
					onChange={handleChange}
				/>
			</div>
			<div className='w-full'>
				<input
					placeholder='duration (in days)'
					className='text-black p-5 border border-gray-300 rounded-md w-full mb-4 focus:border-black focus:outline-black'
					type='text'
					name='duration'
					value={tournament.duration}
					onChange={handleChange}
				/>
			</div>
			<div className='w-full'>
				<input
					placeholder='minimum amount to stake (in WCT)'
					className='text-black p-5 border border-gray-300 rounded-md w-full mb-4 focus:border-black focus:outline-black'
					type='text'
					name='stake'
					value={tournament.stake}
					onChange={handleChange}
				/>
			</div>
			<div className='flex items-baseline justify-center'>
				<label className='mr-4'>IsPrivate</label>
				<input
					className='text-black p-5 border border-gray-300 rounded-md w-full mb-4 focus:border-black focus:outline-black'
					type='checkbox'
					checked={isPrivate}
					onChange={e => setIsPrivate(e.target.checked)}
				/>
			</div></>)}
			
			{isAdmin && 
				 <button
				 onClick={handleCreate}
				 className='flex justify-center items-center mt-10 bg-[#0E1027] w-48 px-5 py-3 text-base rounded-lg hover:bg-slate-900'
			 >
				 {loading ? (
					 <>
						 <ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
						 Creating...
					 </>
				 ) : (
					 <>
						 Create Tournament <BsArrowRight className='ml-4' />
					 </>
				 )}
			 </button>

			}
			{!isAdmin && !hasApproved && (<>
				<p className='text-center text-[0.8rem]'>You would need to approve, and stake, at least the minimum stake before creating tournament</p>
				<button
					onClick={handleApprove}
					className='flex justify-center items-center mt-10 bg-[#0E1027] w-48 px-5 py-3 text-base rounded-lg hover:bg-slate-900'
				>
					{loading ? (
						<>
							<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
							Approving...
						</>
					) : (
						<>
							Approve {tournament.stake} WCT <BsArrowRight className='ml-4' />
						</>
					)}
				</button></>
			)}
			{!isAdmin && hasApproved && !hasStaked && (
				<button
					onClick={handleStake}
					className='flex justify-center items-center mt-10 bg-[#0E1027] w-48 px-5 py-3 text-base rounded-lg hover:bg-slate-900'
				>
					{loading ? (
						<>
							<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
							Stake...
						</>
					) : (
						<>
							Stake {tournament.stake} WCT <BsArrowRight className='ml-4' />
						</>
					)}
				</button>
			)}
			{!isAdmin && hasApproved && hasStaked && !hasCreated && (
				<button
					onClick={handleCreate}
					className='flex justify-center items-center mt-10 bg-[#0E1027] w-48 px-5 py-3 text-base rounded-lg hover:bg-slate-900'
				>
					{loading ? (
						<>
							<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
							Creating...
						</>
					) : (
						<>
							Create Tournament <BsArrowRight className='ml-4' />
						</>
					)}
				</button>
			)}
			{!isAdmin && hasApproved && hasStaked && hasCreated && (
				<button
					onClick={()=> setCreatedTournament(false)}
					className='flex justify-center items-center mt-10 bg-[#0E1027] w-48 px-5 py-3 text-base rounded-lg hover:bg-slate-900'
				>
					OK
				</button>
			)}
		</div>
	);
};

export default CreatedTournament;
