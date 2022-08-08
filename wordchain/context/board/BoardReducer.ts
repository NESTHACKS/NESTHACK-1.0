import { boardDefault } from '../../Words';
import {
	UPDATE_BOARD,
	UPDATE_CURRENT_ATTEMPT,
	UPDATE_DISABLED_LETTERS,
	UPDATE_GAME_OVER,
	UPDATE_CORRECT_WORD,
	UPDATE_WORD_SET,
	RESET_BOARD,
} from '../types';

const AuthReducer = (state: any, action: any) => {
	switch (action.type) {
		case UPDATE_BOARD:
			return {
				...state,
				board: action.payload,
			};
		case UPDATE_CURRENT_ATTEMPT:
			return {
				...state,
				currentAttempt: action.payload,
			};
		case UPDATE_WORD_SET:
			return {
				...state,
				wordSet: action.payload,
			};
		case UPDATE_DISABLED_LETTERS:
			return {
				...state,
				disabledLetters: [...state.disabledLetters, action.payload],
			};
		case UPDATE_GAME_OVER:
			return {
				...state,
				gameOver: action.payload,
			};
		case UPDATE_CORRECT_WORD:
			return {
				...state,
				correctWord: action.payload,
			};
		case RESET_BOARD:
			return {
				...state,
				...action.payload,
			}
		default:
			return state;
	}
};
export default AuthReducer;
