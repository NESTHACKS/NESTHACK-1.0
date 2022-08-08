import useBoard from '../../hooks/useBoard';
import React from 'react';
import { useRouter } from 'next/router';
import { generateWordSet } from '../../Words';

const GameOver = () => {
	const { currentAttempt, gameOver, correctWord, resetBoard, generateWords } = useBoard();
	const router = useRouter();

	const restartGame= () => {
		resetBoard();
		generateWords();
	}
	return (
		<div className='text-white flex justify-center items-center flex-col mt-4 text-xl'>
			<h3>
				{gameOver.guessedWord
					? 'You Correctly Guessed the Wordle'
					: 'You Failed to Guess the Word'}
			</h3>
			<h1>Correct Word: {correctWord}</h1>
			{gameOver.guessedWord && (
				<h3>You guessed in {currentAttempt.attempt} attempts</h3>
			)}
			<div className='flex items-center'>
				<button
					onClick={() => {
						router.push('/dashboard');
					}}
					className='border text-sm mr-12 mt-8 border-[#0E1027] p-3 bg-[#0E1027] text-white w-36 rounded-md uppercase'
				>
					return to dashboard
				</button>
				<button
					onClick={restartGame}
					className='border h-16 mt-8 text-sm border-[#0E1027] p-3 bg-[#0E1027] text-white w-36 rounded-md uppercase'
				>
					play again
				</button>
			</div>
		</div>
	);
};

export default GameOver;
