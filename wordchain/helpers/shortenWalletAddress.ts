const shortenWalletAddress = (address: string) => {
	const firstPart = address.slice(0, 6);
	const lastPart = address.slice(-4);

	const finalOuput = `${firstPart}...${lastPart}`;

	return finalOuput;
};

export default shortenWalletAddress;
