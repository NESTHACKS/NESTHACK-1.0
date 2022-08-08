import Web3 from 'web3';

const convertToWei = (web3: Web3, price: string) => {
	if (web3) {
		return web3.utils.toWei(price, 'ether');
	}
};

export default convertToWei;
