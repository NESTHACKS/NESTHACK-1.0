import { useContext } from 'react';
import AlertContext from '../context/alert/AlertContext';

/**
 * This is a hook to return all (functions / methods) and state variables in the alert context provider
 * Prevents reimports and repititions of useContext and the alert context
 * @returns
 */
const useAlert = () => {
	const {
		//methods
		setAlert,

		//state variables
		alerts,
	} = useContext(AlertContext);

	return {
		//methods
		setAlert,

		//state variables
		alerts,
	};
};

export default useAlert;
