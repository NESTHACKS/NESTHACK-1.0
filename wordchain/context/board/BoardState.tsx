import React, { useReducer } from 'react';
import BoardContext from './BoardContext';
import BoardReducer from './BoardReducer';
import {
	RESET_BOARD,
	UPDATE_BOARD,
	UPDATE_CORRECT_WORD,
	UPDATE_CURRENT_ATTEMPT,
	UPDATE_DISABLED_LETTERS,
	UPDATE_GAME_OVER,
	UPDATE_WORD_SET,
} from '../types';
import { boardDefault, generateWordSet } from '../../Words';

const BoardState = (props: any) => {
	const initialState = {
		board: boardDefault,
		currentAttempt: {
			attempt: 0,
			letterPosition: 0,
		},
		correctWord: '',
		wordSet: new Set(),
		disabledLetters: [],
		gameOver: {
			gameOver: false,
			guessedWord: false,
		},
	};

	const boardRenew = [
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
	];

	const [state, dispatch] = useReducer(BoardReducer, initialState);

	const updateBoard = (newBoard: any) => {
		dispatch({
			type: UPDATE_BOARD,
			payload: newBoard,
		});
	};

	const updateCurrentAttempt = (newAttempt: any) => {
		dispatch({
			type: UPDATE_CURRENT_ATTEMPT,
			payload: newAttempt,
		});
	};

	const resetBoard = () => {
		dispatch({
			type: RESET_BOARD,
			payload: {
				...initialState,
				board: boardRenew,
			},
		});
	}

	const onEnter = () => {
		if (state.currentAttempt.letterPosition !== 5) return;
		let currWord = '';
		for (let i = 0; i < 5; i++) {
			currWord += state.board[state.currentAttempt.attempt][i];
		}

		updateCurrentAttempt({
			attempt: state.currentAttempt.attempt + 1,
			letterPosition: 0,
		});

		// if (state.wordSet.has(currWord.toLowerCase())) {
		// 	updateCurrentAttempt({
		// 		attempt: state.currentAttempt.attempt + 1,
		// 		letterPosition: 0,
		// 	});
		// }
		// else {
		// 	alert('Word not found');
		// }

		if (currWord.toLowerCase() === state.correctWord.toLowerCase()) {
			updateGameOver({ ...state.gameOver, gameOver: true, guessedWord: true });
			return;
		}

		if (state.currentAttempt.attempt === 5) {
			updateGameOver({ ...state.gameOver, gameOver: true, guessedWord: false });
			return;
		}
	};

	const onDelete = () => {
		if (state.currentAttempt.letterPosition === 0) return;
		const newBoard = [...state.board];
		newBoard[state.currentAttempt.attempt][
			state.currentAttempt.letterPosition - 1
		] = '';
		updateBoard(newBoard);
		updateCurrentAttempt({
			...state.currentAttempt,
			letterPosition: state.currentAttempt.letterPosition - 1,
		});
	};

	const onSelectLetter = (keyVal: any) => {
		if (state.currentAttempt.letterPosition > 4) return;

		const newBoard = [...state.board];
		newBoard[state.currentAttempt.attempt][
			state.currentAttempt.letterPosition
		] = keyVal;
		updateBoard(newBoard);
		updateCurrentAttempt({
			...state.currentAttempt,
			letterPosition: state.currentAttempt.letterPosition + 1,
		});
	};

	const updateWordSet = (newWordSet: any) => {
		dispatch({
			type: UPDATE_WORD_SET,
			payload: newWordSet,
		});
	};

	const generateWords = async () => {
		const data = await generateWordSet();
		updateWordSet(data.wordSet);
		updateCorrectWord(data.todaysWord);
	};

	const updateDisabledLetters = (newDisabledLetters: any) => {
		dispatch({
			type: UPDATE_DISABLED_LETTERS,
			payload: newDisabledLetters,
		});
	};

	const updateGameOver = (gameover: any) => {
		dispatch({
			type: UPDATE_GAME_OVER,
			payload: gameover,
		});
	};

	const updateCorrectWord = (word: any) => {
		dispatch({
			type: UPDATE_CORRECT_WORD,
			payload: word,
		});
	};

	return (
		<BoardContext.Provider
			value={{
				board: state.board,
				currentAttempt: state.currentAttempt,
				correctWord: state.correctWord,
				wordSet: state.wordSet,
				disabledLetters: state.disabledLetters,
				gameOver: state.gameOver,
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
			}}
		>
			{props.children}
		</BoardContext.Provider>
	);
};

export default BoardState;
