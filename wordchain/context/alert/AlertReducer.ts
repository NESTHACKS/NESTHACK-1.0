import { SET_ALERT, REMOVE_ALERT } from '../types';

interface IAlert {
	id: number;
	message: string;
	type: string;
	timeout?: string;
}

const AlertReducer = (state: any, action: any) => {
	switch (action.type) {
		case SET_ALERT:
			return [...state, action.payload];
		case REMOVE_ALERT:
			return state.filter((alert: IAlert) => alert.id !== action.payload);
		default:
			return state;
	}
};
export default AlertReducer;
