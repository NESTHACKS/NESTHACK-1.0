import React, { useReducer } from 'react';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';
import { v4 as uuidv4 } from 'uuid';

const AlertState = (props: any) => {
	const initialState: any = [];

	const [state, dispatch] = useReducer(AlertReducer, initialState);

	//Set Alert
	const setAlert = (message: string, type: string, timeout = 3000) => {
		const id = uuidv4();
		dispatch({
			type: SET_ALERT,
			payload: { message, type, id },
		});

		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				setAlert,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
