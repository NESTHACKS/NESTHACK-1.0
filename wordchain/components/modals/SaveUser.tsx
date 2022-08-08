import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Dialog } from '@headlessui/react';
import showToast from '../../helpers/showToast';
import { NotificationType } from '../../constants';
import useWallet from '../../hooks/useWallet';
import { ImSpinner9 } from 'react-icons/im';
import { useRouter } from 'next/router';

const SaveUser = ({
	newUsername,
	setNewUserName,
	setSaveUser,
	setToggleImportance,
}: any) => {
	const { wordChainContract, address } = useWallet();
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const handleClick = async () => {
		await checkIfUserNameExists(newUsername);
	};

	const checkIfUserNameExists = async (username: any) => {
		if (username === '')
			return showToast('Username is required', NotificationType.ERROR);
		setLoading(true);
		try {
			const res = await wordChainContract.methods
				.checkIfUsernameExists(username)
				.call();
			if (res) {
				setLoading(false);
				return showToast(
					`${username} is taken, try another`,
					NotificationType.ERROR
				);
			} else {
				await wordChainContract.methods
					.createUser(username)
					.send({ from: address });
				showToast('Username Created', NotificationType.SUCCESS);
				setLoading(false);
				router.reload();
				setToggleImportance(false);
				return setSaveUser(false);
			}
		} catch (error) {
			showToast((error as Error).message, NotificationType.ERROR);
		}
	};
	return (
		<div className='flex flex-col justify-center items-center'>
			<Dialog.Title
				as='h4'
				className='mb-4 text-base tablet:text-2xl font-bold mt-8'
			>
				You are new here, create a username
			</Dialog.Title>
			<div className='w-full'>
				<input
					placeholder='enter your username'
					className='text-black p-5 border border-gray-300 rounded-md w-full mb-4 focus:border-black focus:outline-black'
					type='text'
					onChange={e => setNewUserName(e.target.value)}
					value={newUsername}
				/>
			</div>
			<button
				onClick={handleClick}
				className='flex justify-center items-center mt-10 bg-[#0E1027] w-48 px-5 py-3 text-base rounded-lg hover:bg-slate-900'
			>
				{loading ? (
					<>
						<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
						Saving...
					</>
				) : (
					<>
						Save User <BsArrowRight className='ml-4' />
					</>
				)}
			</button>
		</div>
	);
};

export default SaveUser;
