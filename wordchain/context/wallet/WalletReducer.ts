import {
	CONNECT_WALLET,
	DISCONNECT_WALLET,
	MONITOR_ACCOUNT_CHANGED,
	MONITOR_DISCONNECT,
	LOAD_CONTRACT,
	FETCH_ALL_TOURNAMENTS,
	FETCH_ALL_PLAYERS,
	FETCH_JOINED_TOURNAMENTS,
	FETCH_ADMINS,
	FETCH_USERS,
	CURRENT_TOURNAMENT,
	FETCH_CONTRACT_ETH,
	FETCH_CONTRACT_TOKENS,
	CHECK_ADMIN,
	FETCH_TOKEN_PRICE
} from '../types';

const WalletReducer = (state: any, action: any) => {
	switch (action.type) {
		case CONNECT_WALLET:
			return {
				...state,
				address: action.payload.accounts[0],
				isConnected: true,
				balance: action.payload.balance,
				web3: action.payload.web3,
				web3Modal: action.payload.web3Modal,
				providerOptions: action.payload.providerOptions,
				provider: action.payload.provider,
			};
		case LOAD_CONTRACT:
			return {
				...state,
				tokenContract: action.payload.tokenContract,
				adminContract: action.payload.adminContract,
				wordChainContract: action.payload.wordchainContract,
				stakingContract: action.payload.stakingContract,
				tokenBalance: action.payload.tokenBalance,
				username: action.payload.username,
			};
		case DISCONNECT_WALLET:
			return {
				...state,
				address: null,
				isConnected: false,
				balance: '',
				web3: null,
				web3Modal: null,
				providerOptions: null,
				provider: null,
			};
		case MONITOR_DISCONNECT:
			return {
				...state,
				isConnected: false,
				balance: '',
				address: null,
			};
		case MONITOR_ACCOUNT_CHANGED:
			return {
				...state,
				address: null,
				isConnected: false,
				balance: '',
			};
		case FETCH_ALL_TOURNAMENTS:
			return {
				...state,
				tournaments: action.payload,
			};
		case FETCH_ALL_PLAYERS:
			return {
				...state,
				players: action.payload,
			};
		case FETCH_ADMINS:
			return {
				...state,
				admins: action.payload,
			};
		case FETCH_USERS:
			return {
				...state,
				users: action.payload,
			};
		case FETCH_JOINED_TOURNAMENTS:
			return {
				...state,
				joinedTournaments: action.payload,
			};
		case CURRENT_TOURNAMENT:
			return {
				...state,
				currentTournament: action.payload,
			};
		case FETCH_CONTRACT_ETH:
			return {
				...state,
				contractEthBalance: action.payload,
			};
		case FETCH_CONTRACT_TOKENS:
			return {
				...state,
				contractTokenBalance: action.payload,
			};
		case CHECK_ADMIN:
		return {
			...state,
			isAdmin: action.payload,
		};
		case FETCH_TOKEN_PRICE:
			return {
				...state,
				tokenPrice: action.payload,
			};
		default:
			return state;
	}
};
export default WalletReducer;
