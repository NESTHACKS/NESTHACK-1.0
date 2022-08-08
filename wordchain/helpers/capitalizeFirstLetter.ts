import Web3 from 'web3';

const capitalizeFirstLetter = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};

export default capitalizeFirstLetter;
