import SingleKey from '../SingleKey/SingleKey';
import useBoard from '../../hooks/useBoard';
import React, { useCallback, useEffect } from 'react';

const Keyboard = () => {
	const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
	const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
	const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

	const { onEnter, onDelete, onSelectLetter, currentAttempt, disabledLetters } =
		useBoard();

	const handleKeyboard = useCallback(
		(event: any) => {
			// if (gameOver.gameOver) return;
			if (event.key === 'Enter') {
				onEnter();
			} else if (event.key === 'Backspace') {
				onDelete();
			} else {
				keys1.forEach(key => {
					if (event.key.toLowerCase() === key.toLowerCase()) {
						onSelectLetter(key);
					}
				});
				keys2.forEach(key => {
					if (event.key.toLowerCase() === key.toLowerCase()) {
						onSelectLetter(key);
					}
				});
				keys3.forEach(key => {
					if (event.key.toLowerCase() === key.toLowerCase()) {
						onSelectLetter(key);
					}
				});
			}
		},
		//eslint-disable-next-line
		[currentAttempt]
	);
	useEffect(() => {
		document.addEventListener('keydown', handleKeyboard);

		return () => {
			document.removeEventListener('keydown', handleKeyboard);
		};
	}, [handleKeyboard]);

	return (
		<div className='w-[700px] h-[300px] mt-[60px] mx-auto' onKeyDown={handleKeyboard}>
			<div className=' flex justify-center m-[5px]'>
				{keys1.map((key, index) => {
					return (
						<SingleKey
							disabled={disabledLetters.includes(key)}
							key={index}
							keyVal={key}
						/>
					);
				})}
			</div>
			<div className=' flex justify-center m-[5px]'>
				{keys2.map((key, index) => {
					return (
						<SingleKey
							disabled={disabledLetters.includes(key)}
							key={index}
							keyVal={key}
						/>
					);
				})}
			</div>
			<div className=' flex justify-center m-[5px]'>
				<SingleKey bigKey keyVal={'ENTER'} />
				{keys3.map((key, index) => {
					return (
						<SingleKey
							disabled={disabledLetters.includes(key)}
							key={index}
							keyVal={key}
						/>
					);
				})}
				<SingleKey bigKey keyVal={'DELETE'} />
			</div>
		</div>
	);
};

export default Keyboard;
