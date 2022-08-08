import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { Dialog } from '@headlessui/react';
import showToast from '../../helpers/showToast';
import { NotificationType } from '../../constants';
import useWallet from '../../hooks/useWallet';
import { ImSpinner9 } from 'react-icons/im';
import convertToWei from '../../helpers/convertToWei';

const WithdrawToken = ({ setBuyToken }: any) => {
	const { stakingContract, address, web3, tokenPrice, tokenBalance, tokenContract } = useWallet();
	const [loading, setLoading] = useState<boolean>(false);
	const [amount, setAmount] = useState('0.01');
	const [hasApproved, setHasApproved] = useState(false);

    const handleApprove = async () => {
		if (Number(tokenBalance) < Number(amount)) return showToast('Insufficent tokens', 'error');

		setLoading(true);
		try {
			await tokenContract.methods
				.approve(stakingContract._address, convertToWei(web3, amount))
				.send({ from: address });
			setHasApproved(true);
			showToast('Approved', NotificationType.SUCCESS);
		} catch (error) {
			showToast((error as Error).message, NotificationType.ERROR);
		}

		setLoading(false);
	};


	const handleWithdraw = async () => {
		if (amount === '') return showToast('Please fill in all fields', 'error');
        if (Number(tokenBalance) < Number(amount)) return showToast('Insufficent tokens', 'error');

		setLoading(true);
		try {
			await stakingContract.methods
				.withdrawTokens(Number(amount))
				.send({ from: address});
			setBuyToken(false);
		} catch (error) {
			showToast((error as Error).message, NotificationType.ERROR);
		}
		setLoading(false);
	};

	return (
		<div className='flex flex-col justify-center items-center'>
			<Dialog.Title
				as='h4'
				className='mb-4 text-[2rem] tablet:text-2xl font-bold mt-8'
			>
				Enter Amount to Withdraw
			</Dialog.Title>
			<Dialog.Title
				as='h4'
				className='mb-4 text-base tablet:text-2xl font-bold mt-8'
			>
				{tokenPrice} WCT = 1 ETH
			</Dialog.Title>
			<div className='w-full'>
				<input
					placeholder='enter the amount'
					className='text-black p-5 border border-gray-300 rounded-md w-full mb-4 focus:border-black focus:outline-black'
					type='number'
					min={0.01}
					onChange={e => setAmount(e.target.value)}
					value={amount}
				/>
			</div>
            {!hasApproved && (
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
							Approve {amount} WCT <BsArrowRight className='ml-4' />
						</>
					)}
				</button>
			)}
			{hasApproved && <button
				onClick={handleWithdraw}
				className='flex justify-center items-center mt-10 bg-[#0E1027] w-48 px-5 py-3 text-base rounded-lg hover:bg-slate-900 text-4'
			>
				{loading ? (
					<>
						<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
						Processing...
					</>
				) : (
					<>
						Withdraw {amount} WCT <BsArrowRight className='ml-4' />
					</>
				)}
			</button>}
		</div>
	);
};

export default WithdrawToken;