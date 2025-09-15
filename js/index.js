function GameBoard() {
	const row = 3;
	const column = 3;
	const board = [];

	for (let i = 0; i < row; i++) {
		board.push([]);
		for (let j = 0; j < column; j++) {
			board[i].push(Cell());
		}
	}

	const getBoard = () => board;

	function printGridToConsole() {
		for (let gridRow = 0; gridRow < board.length; gridRow++) {
			const grid = `${board[gridRow]
				.map((cell) => ` ${cell.getSign() || '-'} `)
				.join('|')}`;
			console.log(grid);
		}
	}

	return { getBoard, printGridToConsole };
}

function Cell() {
	let value = null;
	const addSign = (player) => {
		value = player.getPlayerSign();
	};
	const getSign = () => value;
	return { addSign, getSign };
}

function Players(playerName, playerSign) {
	const getPlayerSign = () => playerSign;
	const getPlayerName = () => playerName;

	return { getPlayerName, getPlayerSign };
}

const winningCombos = [
	[
		[0, 0],
		[0, 1],
		[0, 2],
	],
	[
		[1, 0],
		[1, 1],
		[1, 2],
	],
	[
		[2, 0],
		[2, 1],
		[2, 2],
	],
	[
		[0, 0],
		[1, 0],
		[2, 0],
	],
	[
		[0, 1],
		[1, 1],
		[2, 1],
	],
	[
		[0, 2],
		[1, 2],
		[2, 2],
	],
	[
		[0, 0],
		[1, 1],
		[2, 2],
	],
	[
		[0, 2],
		[1, 1],
		[2, 0],
	],
];
function GameController() {
	let gameOver = false;
	const board = GameBoard();
	const player1 = Players('john', 'X');
	const player2 = Players('Hellen', 'O');
	let activePlayer = player1;

	function availableCells() {
		let availableCellsArr = [];
		board.getBoard().forEach((rw) => {
			rw.forEach((cl) => {
				if (cl.getSign() === null) availableCellsArr.push(cl);
			});
		});
		return availableCellsArr;
	}

	function checkWinner() {
		const boardArr = board.getBoard();

		for (let combo of winningCombos) {
			const [a, b, c] = combo;
			const first = boardArr[a[0]][a[1]].getSign();
			const second = boardArr[b[0]][b[1]].getSign();
			const third = boardArr[c[0]][c[1]].getSign();

			if (first && first === second && first === third) {
				return first;
			}
		}
		return null;
	}

	function playRound(row, col) {
		if (gameOver) {
			console.log('Game is already over.');
			return;
		}

		const selectedCell = board.getBoard()[row][col];

		if (selectedCell.getSign() !== null) {
			console.log('Cell has been taken');
			return;
		}

		// Place sign
		selectedCell.addSign(activePlayer);
		board.printGridToConsole();
		console.log(
			`${activePlayer.getPlayerName()} plays at row ${row} column ${col}`
		);

		// Check winner
		const winner = checkWinner();
		if (winner) {
			console.log(
				`Winner is ${activePlayer.getPlayerName()} (${winner})`
			);
			gameOver = true;
			return;
		}

		// Check draw
		if (!availableCells().length) {
			console.log("It's a draw!");
			gameOver = true;
			return;
		}

		// Switch turn
		activePlayer = activePlayer === player1 ? player2 : player1;
		console.log('.....');
	}
	function resetGame() {
		board = GameBoard(); // make a new fresh board
		activePlayer = player1;
		gameOver = false;
		console.log('Game has been reset!');
		board.printGridToConsole();
	}

	return { playRound, resetGame };
}

console.log('hello');
const game = GameController();

function screenController() {}

game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(2, 0);
game.playRound(2, 1);
game.playRound(1, 0);
game.playRound(0, 0);
game.playRound(1, 2);
game.playRound(2, 2);
game.playRound(0, 2);
