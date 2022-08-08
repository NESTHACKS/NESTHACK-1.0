let ipfsMini = require('ipfs-mini');

const config = {
	host: 'ipfs.infura.io',
	port: 5001,
	protocol: 'https',
};

ipfsMini = new ipfsMini(config);

export { ipfsMini };