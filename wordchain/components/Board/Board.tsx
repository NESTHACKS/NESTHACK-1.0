import Letter from '../Letter/Letter';
import React from 'react';

const Board = () => {
	return (
		<div className='w-[500px] h-[550px] border border-black flex flex-col mx-auto'>
			<div className='flex w-[1/5] m-[5px]'>
				<Letter letterPosition={0} attemptPosition={0} />
				<Letter letterPosition={1} attemptPosition={0} />
				<Letter letterPosition={2} attemptPosition={0} />
				<Letter letterPosition={3} attemptPosition={0} />
				<Letter letterPosition={4} attemptPosition={0} />
			</div>
			<div className='flex w-[1/5] m-[5px]'>
				<Letter letterPosition={0} attemptPosition={1} />
				<Letter letterPosition={1} attemptPosition={1} />
				<Letter letterPosition={2} attemptPosition={1} />
				<Letter letterPosition={3} attemptPosition={1} />
				<Letter letterPosition={4} attemptPosition={1} />
			</div>
			<div className='flex w-[1/5] m-[5px]'>
				<Letter letterPosition={0} attemptPosition={2} />
				<Letter letterPosition={1} attemptPosition={2} />
				<Letter letterPosition={2} attemptPosition={2} />
				<Letter letterPosition={3} attemptPosition={2} />
				<Letter letterPosition={4} attemptPosition={2} />
			</div>
			<div className='flex w-[1/5] m-[5px]'>
				<Letter letterPosition={0} attemptPosition={3} />
				<Letter letterPosition={1} attemptPosition={3} />
				<Letter letterPosition={2} attemptPosition={3} />
				<Letter letterPosition={3} attemptPosition={3} />
				<Letter letterPosition={4} attemptPosition={3} />
			</div>
			<div className='flex w-[1/5] m-[5px]'>
				<Letter letterPosition={0} attemptPosition={4} />
				<Letter letterPosition={1} attemptPosition={4} />
				<Letter letterPosition={2} attemptPosition={4} />
				<Letter letterPosition={3} attemptPosition={4} />
				<Letter letterPosition={4} attemptPosition={4} />
			</div>
			<div className='flex w-[1/5] m-[5px]'>
				<Letter letterPosition={0} attemptPosition={5} />
				<Letter letterPosition={1} attemptPosition={5} />
				<Letter letterPosition={2} attemptPosition={5} />
				<Letter letterPosition={3} attemptPosition={5} />
				<Letter letterPosition={4} attemptPosition={5} />
			</div>
		</div>
	);
};

export default Board;
