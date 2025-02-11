let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = {
    'X': 0,
    'O': 0
};
let moveHistory = []; // Array to store game state after each move

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellClicked = (cellIndex) => {
    if (gameActive && board[cellIndex] === '') {
        // Save current board state before making the move
        moveHistory.push([...board]);
        
        board[cellIndex] = currentPlayer;
        document.getElementsByClassName('cell')[cellIndex].innerText = currentPlayer;
        checkResult();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const checkResult = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.getElementById('message').innerText = `${board[a]} wins!`;
            updateScore(board[a]);
            break;
        }
    }
    if (!board.includes('') && gameActive) {
        gameActive = false;
        document.getElementById('message').innerText = `It's a draw!`;
    }
};

const updateScore = (winner) => {
    scores[winner]++;
    document.getElementById('scoreX').innerText = scores['X'];
    document.getElementById('scoreO').innerText = scores['O'];
};

const undoMove = () => {
    if (moveHistory.length > 1) {
        moveHistory.pop(); // Remove current move from history
        board = [...moveHistory[moveHistory.length - 1]]; // Restore previous board state
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateBoardUI();
        gameActive = true;
        document.getElementById('message').innerText = '';
    }
};

const resetBoard = () => {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    moveHistory = []; // Reset move history
    gameActive = true;
    updateBoardUI();
    document.getElementById('message').innerText = '';
};

const updateBoardUI = () => {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = board[i];
    }
};

