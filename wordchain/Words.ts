// import wordBank from "../../../";
export const boardDefault = [
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
];

export const generateWordSet = async () => {
	let wordSet;
	let todaysWord;

	await fetch('/wordleBank.txt')
		.then(response => response.text())
		.then(result => {
			const wordArr = result.split('\n');
			todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
			wordSet = new Set(wordArr);
		});
	return { wordSet, todaysWord };
};
