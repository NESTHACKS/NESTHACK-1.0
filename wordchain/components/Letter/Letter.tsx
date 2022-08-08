import useBoard from '../../hooks/useBoard';
import React, { useEffect } from 'react';

const Letter = ({ letterPosition, attemptPosition }: any) => {
	const {
		board,
		correctWord,
		currentAttempt,
		updateDisabledLetters,
	} = useBoard();
	const letter = board[attemptPosition][letterPosition];

	const correct = correctWord.toUpperCase()[letterPosition] === letter;
	const almost =
		!correct && letter !== '' && correctWord.toUpperCase().includes(letter);

	useEffect(() => {
		if (letter !== '' && !correct && !almost) {
			updateDisabledLetters(letter);
		}
	}, [currentAttempt.attempt]);

	return (
		<div
			className={`w-[33%] uppercase h-[70px] ${
				currentAttempt.attempt > attemptPosition &&
				(correct ? 'bg-[#528d4e]' : almost ? 'bg-[#b49f39]' : 'bg-[#3a393c]')
			} border border-gray-500 m-[5px] grid place-items-center text-[30px] font-semibold text-white`}
		>
			{letter}
		</div>
	);
};

export default Letter;
