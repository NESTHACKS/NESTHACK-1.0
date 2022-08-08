import React, { useEffect, useState } from 'react';
import Board from '../Board/Board';
import GameOver from '../GameOver/GameOver';
import Keyboard from '../Keyboard/Keyboard';
import useBoard from '../../hooks/useBoard';
import useWallet from '../../hooks/useWallet';
import showToast from '../../helpers/showToast';
import { useRouter } from 'next/router';
import { NotificationType } from '../../constants';
import { ImSpinner9 } from 'react-icons/im';

const Wordle = () => {
	const [isSendingScore, setIsSendingScore] = useState(false);
	const router = useRouter();
    const { gameOver, generateWords, currentAttempt } = useBoard();
	const { currentTournament, players, address, sendScore, wordChainContract } = useWallet();

    const handleGameOver = async () => {
		let playerTournamentId = players.filter((t:any) => t.address === address)[0].id;

		try {
			setIsSendingScore(true);
			await sendScore(wordChainContract, address, currentTournament, 7 - currentAttempt.attempt, playerTournamentId);
			showToast("Score saved", NotificationType.SUCCESS);
		} catch (error) {
			showToast((error as Error).message, NotificationType.ERROR);
		}
		setIsSendingScore(false);
    }
    

	useEffect(() => {
		if (wordChainContract === null) {
			router.push("/");
		}
		generateWords();
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if(gameOver.gameOver) {
			handleGameOver();
		}
		//eslint-disable-next-line
	}, [gameOver.gameOver]);
	return (
        <div className='w-[800px] mx-auto'>
			{isSendingScore && <div className= 'absolute top-4 right-4 h-[50px] w-48 rounded-lg bg-[aliceblue] flex items-center justify-center'>
				<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
				<p>Sending Score...</p>
			</div>}
            <h1 className='text-7xl text-center text-white pt-12 mb-4'>Wordle</h1>
			<Board />
			{gameOver.gameOver ? <GameOver /> : <Keyboard />}
		</div>
	);
};

export default Wordle;
