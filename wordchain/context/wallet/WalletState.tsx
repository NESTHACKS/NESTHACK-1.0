import React, { useReducer } from 'react';
import WalletContext from './WalletContext';
import WalletReducer from './WalletReducer';
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
	FETCH_TOKEN_PRICE,
} from '../types';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import wordchainJson from '../../artifacts/wordchain.json';
import adminJson from '../../artifacts/admin.json';
import stakingJson from '../../artifacts/staking.json';
import tokenJson from '../../artifacts/token.json';
import convertToEther from '../../helpers/convertToEther';
import useAlert from '../../hooks/useAlert';
import { NotificationType } from '../../constants';

const WalletState = (props: any) => {
	const initialState = {
		address: null,
		isConnected: false,
		balance: '',
		web3: null,
		provider: null,
		symbol: '',
		providerOptions: null,
		web3Modal: null,
		tokenContract: null,
		adminContract: null,
		wordChainContract: null,
		stakingContract: null,
		tokenBalance: '',
		username: '',
		tournaments: [],
		players: [],
		joinedTournaments: [],
		admins: [],
		users: [],
		currentTournament: -1,
		contractEthBalance: '0',
		contractTokenBalance: '0',
		isAdmin: false,
		tokenPrice: 0,
	};

	const [state, dispatch] = useReducer(WalletReducer, initialState);

	const { setAlert } = useAlert();

	const setCurrentTournament = (tournamentId: any) => {
		dispatch({
			type: CURRENT_TOURNAMENT,
			payload: tournamentId,
		});
	};

	//Connect Wallet on Ethereum Network
	const connectWallet = async (router: any) => {
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider, // required
				options: {
					infuraId: process.env.NEXT_PUBLIC_INFURA_APP_ID,
				},
			},
		};
		const web3Modal = new Web3Modal({
			theme: 'dark',
			network: 'mainnet', // optional
			cacheProvider: true, // optional
			providerOptions, // required
			//disableInjectedProvider: false
		});
		try {
			const provider = await web3Modal.connect();

			const web3 = new Web3(provider);

			//  Get Accounts
			const accounts = await web3.eth.getAccounts();

			if (accounts.length > 0) {
				//Get Balance
				let balance;
				await web3.eth.getBalance(`${accounts[0]}`, function (err, result) {
					if (err) {
						setAlert(err.message, NotificationType.ERROR);
					} else {
						balance = convertToEther(web3, result);
					}
				});

				dispatch({
					type: CONNECT_WALLET,
					payload: {
						balance,
						accounts,
						web3,
						web3Modal,
						providerOptions,
						provider,
					},
				});
				localStorage.setItem('isWalletConnected', 'true');
				localStorage.setItem('count', '1');

				const count = localStorage.getItem('count');

				count !== '1'
					? setAlert('Wallet Connected', NotificationType.SUCCESS)
					: null;
				//router.push('/dashboard');
			}
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Load Contract
	const loadContract = async (web3: any, address: any, router: any) => {
		try {
			const tokenContract = new web3.eth.Contract(
				tokenJson,
				`${process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS}`
			);
			const adminContract = new web3.eth.Contract(
				adminJson,
				`${process.env.NEXT_PUBLIC_ADMIN_CONTRACT_ADDRESS}`
			);
			const stakingContract = new web3.eth.Contract(
				stakingJson,
				`${process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS}`
			);
			const wordchainContract = new web3.eth.Contract(
				wordchainJson,
				`${process.env.NEXT_PUBLIC_WORDCHAIN_CONTRACT_ADDRESS}`
			);

			//Get token balance (WCT)
			const res = await tokenContract.methods.balanceOf(address).call();
			const tokenBalance = convertToEther(web3, res);
			const username = await wordchainContract.methods
				.userNames(address)
				.call();

			await checkIfAdmin(adminContract, state.address, router);
			await fetchTokenPrice(stakingContract);

			dispatch({
				type: LOAD_CONTRACT,
				payload: {
					tokenContract,
					adminContract,
					stakingContract,
					wordchainContract,
					tokenBalance,
					username,
				},
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Disconnect wallet
	const disconnectWallet = async (modal: any, router: any) => {
		modal.clearCachedProvider();
		dispatch({
			type: DISCONNECT_WALLET,
		});
		setAlert('Wallet Disconnected', NotificationType.SUCCESS);
		localStorage.removeItem('isWalletConnected');
		localStorage.removeItem('count');
		router.push('/');
	};

	const checkIfAdmin = async (contract: any, address: any, router: any) => {
		try {
			const res = await contract.methods.admins(address).call();

			dispatch({
				type: FETCH_ADMINS,
				payload: res,
			});
			if (router.pathname === '/' && state.isConnected === true) {
				if (res) {
					router.push('/admin');
				} else {
					router.push('dashboard');
				}
			}
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Monitor disconnect
	const monitorDisconnect = async (provider: any) => {
		// Subscribe to session disconnection
		provider.on('disconnect', (code: number, reason: string) => {
			dispatch({
				type: MONITOR_DISCONNECT,
			});
			localStorage.removeItem('isWalletConnected');
			localStorage.removeItem('count');
			setAlert(reason, NotificationType.ERROR);
		});
	};
	//Monitor account changed
	const monitorAccountChanged = async (provider: any) => {
		// Subscribe to accounts change
		provider.on('accountsChanged', (accounts: string[]) => {
			dispatch({
				type: MONITOR_ACCOUNT_CHANGED,
			});
			localStorage.removeItem('isWalletConnected');
			localStorage.removeItem('count');
		});
	};

	//Fetch all tournaments
	const fetchAllTournaments = async (contract: any) => {
		try {
			const res = await contract.methods.getAllTournaments().call();
			let tournaments: any = [];
			res.map((dat: any) => {
				let item: any = {};
				item.id = dat.id;
				item.name = dat.name;
				item.description = dat.description;
				item.deadline = dat.deadline;
				item.minimumStakeAmount = convertToEther(
					state.web3,
					dat.minimumStakeAmount
				);
				item.totalStake = convertToEther(state.web3, dat.totalStake);
				item.isPrivate = dat.isPrivate;
				item.owner = dat.owner;
				item.tournamentKey = dat.tournamentKey;
				item.numberOfParticipants = dat.numberOfParticipants;
				item.createdAt = dat.createdAt;
				item.isAdminCreated = dat.isAdminCreated;
				tournaments.push(item);
			});

			dispatch({
				type: FETCH_ALL_TOURNAMENTS,
				payload: tournaments,
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Fetch joined tournaments
	const fetchJoinedTournaments = async (
		contract: any,
		address: any,
		web3: Web3
	) => {
		try {
			const res = await contract.methods.getTournamentsJoined(address).call();

			let tournaments: any = [];
			res.map((dat: any) => {
				let item: any = {};
				item.id = dat.id;
				item.isAdminCreated = dat.isAdminCreated;
				item.createdAt = dat.createdAt;
				item.isPrivate = dat.isPrivate;
				item.description = dat.description;
				item.deadline = dat.deadline;
				item.minimumStakeAmount = convertToEther(web3, dat.minimumStakeAmount);
				item.totalStake = convertToEther(web3, dat.totalStake);
				item.tournamentKey = dat.tournamentKey;
				item.numberOfParticipants = dat.numberOfParticipants;
				item.name = dat.name;
				item.owner = dat.owner;
				tournaments.push(item);
			});

			dispatch({
				type: FETCH_JOINED_TOURNAMENTS,
				payload: tournaments,
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//Fetch all players
	const fetchAllPlayers = async (contract: any, tournamentId: any) => {
		try {
			const res = await contract.methods
				.getTournamentPlayers(tournamentId)
				.call();

			let players: any = [];
			res.map((dat: any) => {
				let item: any = {};
				item.id = dat.id;
				item.username = dat.username;
				item.score =
					Number(dat.gamesPlayed) === 0
						? 0
						: Number(dat.score) / Number(dat.gamesPlayed);
				item.gamesPlayed = dat.gamesPlayed;
				item.address = dat.add_;
				players.push(item);
			});

			dispatch({
				type: FETCH_ALL_PLAYERS,
				payload: players,
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	const fetchAdmins = async (contract: any) => {
		try {
			const res = await contract.methods.getAllAdmins().call();

			dispatch({
				type: FETCH_ADMINS,
				payload: res,
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	const fetchAllUsers = async (contract: any) => {
		try {
			const res = await contract.getPastEvents('CreateUser', { fromBlock: 0 });
			const blacklist = await contract.getPastEvents('BlackList', {
				fromBlock: 0,
			});
			let users: any[] = [];

			res.forEach((dat: any) => {
				let item: any = {};
				item.username = dat.returnValues.userName;
				item.address = dat.returnValues.userAddress;
				item.isBlacklisted = false;
				blacklist.forEach((t: any) => {
					if (t.returnValues.user === dat.userAddress) {
						item.isBlacklisted = true;
					}
				});
				users.push(item);
			});
			dispatch({
				type: FETCH_USERS,
				payload: users,
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	const fetchContractEthBalance = async (contract: any) => {
		try {
			const res = await contract.methods.getETHBalance().call();

			dispatch({
				type: FETCH_CONTRACT_ETH,
				payload: convertToEther(state.web3, res),
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	const fetchContractTokenBalance = async (contract: any) => {
		try {
			const res = await contract.methods
				.getTokenBalance(contract._address)
				.call();

			dispatch({
				type: FETCH_CONTRACT_TOKENS,
				payload: convertToEther(state.web3, res),
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	const fetchTokenPrice = async (contract: any) => {
		try {
			const res = await contract.methods.tokensPerEth().call();

			dispatch({
				type: FETCH_TOKEN_PRICE,
				payload: res,
			});
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}

	}

	//create tournament
	const createTournament = async (
		contract: any,
		name: any,
		description: any,
		duration: any,
		stake: any,
		isPrivate: any,
		tournamentKey: any,
		address: any
	) => {
		try {
			await contract.methods
				.createTournament(
					name,
					description,
					duration,
					stake,
					isPrivate,
					tournamentKey
				)
				.send({
					from: address,
				});
			await fetchAllTournaments(state.contract);
			setAlert('Tournament Created', NotificationType.SUCCESS);
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	//join tournament
	const joinTournament = async (
		contract: any,
		tournamentId: any,
		tournamentKey: any,
		address: any,
		router: any
	) => {
		try {
			await contract.methods.joinTournament(tournamentId, tournamentKey).send({
				from: address,
			});
			setAlert('Tournament Joined', NotificationType.SUCCESS);
			router.push(`/dashboard/tournaments/${tournamentId}`);
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	const sendScore = async (
		contract: any,
		address: any,
		tournamentId: any,
		score: any,
		playerId: any
	) => {
		try {
			await contract.methods.sendScore(tournamentId, score, playerId).send({
				from: address,
			});
			setAlert('Score saved', NotificationType.SUCCESS);
		} catch (error) {
			setAlert((error as Error).message, NotificationType.ERROR);
		}
	};

	return (
		<WalletContext.Provider
			value={{
				address: state.address,
				isConnected: state.isConnected,
				balance: state.balance,
				web3: state.web3,
				provider: state.provider,
				symbol: state.symbol,
				providerOptions: state.providerOptions,
				web3Modal: state.web3Modal,
				tokenContract: state.tokenContract,
				adminContract: state.adminContract,
				wordChainContract: state.wordChainContract,
				stakingContract: state.stakingContract,
				tokenBalance: state.tokenBalance,
				username: state.username,
				tournaments: state.tournaments,
				players: state.players,
				joinedTournaments: state.joinedTournaments,
				admins: state.admins,
				users: state.users,
				currentTournament: state.currentTournament,
				contractEthBalance: state.contractEthBalance,
				contractTokenBalance: state.contractTokenBalance,
				isAdmin: state.isAdmin,
				tokenPrice: state.tokenPrice,
				connectWallet,
				disconnectWallet,
				monitorAccountChanged,
				monitorDisconnect,
				loadContract,
				fetchAllTournaments,
				createTournament,
				joinTournament,
				fetchAllPlayers,
				fetchJoinedTournaments,
				fetchAdmins,
				fetchAllUsers,
				setCurrentTournament,
				sendScore,
				fetchContractTokenBalance,
				fetchContractEthBalance,
				checkIfAdmin,
				fetchTokenPrice,
			}}
		>
			{props.children}
		</WalletContext.Provider>
	);
};

export default WalletState;
