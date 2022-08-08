import useBoard from '../../hooks/useBoard';
import React from 'react';

const SingleKey = ({ keyVal, bigKey, disabled }: any) => {
	const { onDelete, onEnter, onSelectLetter } = useBoard();
	const selectLetter = () => {
		if (keyVal === 'ENTER') {
			onEnter();
		} else if (keyVal === 'DELETE') {
			onDelete();
		} else {
			onSelectLetter(keyVal);
		}
	};

	return (
		<div
			className={`w-[50px] h-[70px] m-[5px] flex items-center justify-center rounded-[4px] place-items-center text-[20px] bg-gray-500 text-white cursor-pointer ${
				bigKey ? 'w-[100px]' : disabled && 'bg-[#3a393c]'
			}`}
			onClick={selectLetter}
		>
			{keyVal}
		</div>
	);
};

export default SingleKey;
