let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let lastMove = null;

document.addEventListener('DOMContentLoaded', () => {
    createBoard();
    updatePlayerTurn();
});

function createBoard() {
    const boardElement = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => cellClick(i));
        boardElement.appendChild(cell);
    }
}

function cellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;

    lastMove = { index, value: gameBoard[index] };
    gameBoard[index] = currentPlayer;
    updateBoard();
    checkWinner();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updatePlayerTurn();
}

function undoMove() {
    if (lastMove && gameActive) {
        gameBoard[lastMove.index] = '';
        currentPlayer = lastMove.value === 'X' ? 'O' : 'X';
        lastMove = null;
        updateBoard();
        updatePlayerTurn();
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index];
        cell.classList.remove('O');
        if (gameBoard[index] === 'O') {
            cell.classList.add('O');
        }
    });
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            showResult(`${currentPlayer} wins!`);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        showResult('It\'s a tie!');
    }
}

function showResult(resultText) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = resultText;
    resultElement.style.display = 'block';
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    lastMove = null;
    document.getElementById('result').style.display = 'none';
    updateBoard();
    updatePlayerTurn();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updatePlayerTurn();
}

function updatePlayerTurn() {
    const playerTurnElement = document.getElementById('playerTurn');
    playerTurnElement.textContent = `Player's Turn: ${currentPlayer}`;
}
