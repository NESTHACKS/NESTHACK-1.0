import toast from 'react-hot-toast';

/**
 * This is a function to show toast notifications based on type
 * @returns
 */
const showToast = (message: string, type: string) => {
	switch (type) {
		case 'success':
			toast.success(message);
			break;
		case 'error':
			toast.error(message);
			break;
	}
};

export default showToast;
