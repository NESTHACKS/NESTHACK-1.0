import BoardContext from '../context/board/BoardContext';
import { useContext } from 'react';

const useBoard = () => {
	const {
		// methods
		updateBoard,
		updateCurrentAttempt,
		onEnter,
		onDelete,
		onSelectLetter,
		updateWordSet,
		generateWords,
		updateDisabledLetters,
		updateGameOver,
		updateCorrectWord,
		resetBoard,

		// state variables
		board,
		currentAttempt,
		correctWord,
		wordSet,
		disabledLetters,
		gameOver,
	} = useContext(BoardContext);

	return {
		// methods
		updateBoard,
		updateCurrentAttempt,
		onDelete,
		onEnter,
		onSelectLetter,
		updateWordSet,
		generateWords,
		updateDisabledLetters,
		updateGameOver,
		updateCorrectWord,
		resetBoard,

		// state variables
		board,
		currentAttempt,
		correctWord,
		wordSet,
		disabledLetters,
		gameOver,
	};
};

export default useBoard;
