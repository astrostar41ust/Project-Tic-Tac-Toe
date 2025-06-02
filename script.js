// Player factory function
const Player = (name, symbol) => {
    return { name, symbol };
}

// Gameboard module
const Gameboard = (() => {
    let board = Array(9).fill('');

    const getBoard = () => board;

    const makeMove = (index, symbol) => {
        if (board[index] === '') {
            board[index] = symbol;

            return true;
        }

        return false;
    }

    const reset = () => {

        board = Array(9).fill('');


    }

    return { getBoard, makeMove, reset }

})()


// Game controller module
const GameController = (() => {

    let board = Gameboard.getBoard();

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],// Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8],// Vertical
        [0, 4, 8], [2, 4, 6]// Diagonal

    ];



    const checkGameStatus = (board) => {

        for (const combination of winningCombinations) {

            const [a, b, c] = combination;

            const symbolA = board[a];
            const symbolB = board[b];
            const symbolC = board[c];

            if (symbolA === symbolB && symbolB === symbolC && symbolA !== '') {

                return symbolA;
            }

        }

        const isBoardFull = (board) => {
            return !board.includes('');
        };

        if (isBoardFull(board)) {

            return 'draw';
        }

        return 'continue';
    }



    let player1;
    let player2;
    let currentPlayer;
    let gameActive;

    const startGame = (name1, symbol1, name2, symbol2) => {
        player1 = Player(name1, symbol1);
        player2 = Player(name2, symbol2);
        currentPlayer = player1;
        gameActive = true;

    };

    const playRound = (cellIndex) => {

        if (!gameActive) {

            DisplayController.updateStatus("Game is over! Click Restart to play again.");
            return false;
        }

        let moveStatus = Gameboard.makeMove(cellIndex, currentPlayer.symbol);

        if (moveStatus) {
            DisplayController.renderBoard(Gameboard.getBoard());

            let gameStatus = checkGameStatus(Gameboard.getBoard());

            if (gameStatus === 'continue') {
                if (currentPlayer === player1) {
                    currentPlayer = player2;
                }
                else {
                    currentPlayer = player1;
                }
                DisplayController.updateStatus(`It's ${currentPlayer.name}'s turn (${currentPlayer.symbol}).`);
            }
            else {
                DisplayController.updateStatus(`Game end Result is ${gameStatus}`)
                gameActive = false;
            }


            return true;
        }
        else {
            DisplayController.updateStatus('move already taken')

            return false;
        }
    };

    const playGame = (name1, symbol1, name2, symbol2) => {
        Gameboard.reset();
        startGame(name1, symbol1, name2, symbol2);

        DisplayController.renderBoard(Gameboard.getBoard());
        DisplayController.updateStatus(`It's ${currentPlayer.name}'s turn (${currentPlayer.symbol}).`);


    };

    return {playRound, playGame };
})()


// Display controller module
const DisplayController = (() => {

    const statusDisplay = document.querySelector('.game-status');
    const boardCell = document.querySelectorAll('.cell');
    const startBtn = document.querySelector('.start-button');
    const restartBtn = document.querySelector('.restart-button');
    const playerSetup = document.querySelector('.player-setup');




    boardCell.forEach((cell) => {
        cell.addEventListener('click', (e) => {

            const clickedIndex = parseInt(e.target.dataset.index);


            GameController.playRound(clickedIndex)
        })


    })

    startBtn.addEventListener('click', () => {
        let name1 = document.querySelector('#player1-name').value || 'Player 1';
        let symbol1 = document.querySelector('#player1-symbol').value || 'X';
        let name2 = document.querySelector('#player2-name').value || 'Player 2';
        let symbol2 = document.querySelector('#player2-symbol').value || 'O';

        
        playerSetup.classList.add('hidden');

        GameController.playGame(name1, symbol1, name2, symbol2);
        DisplayController.updateStatus(`Game start! It is ${name1} (${symbol1}) turn.`);
    })

    restartBtn.addEventListener('click', () => {
       
        playerSetup.classList.remove('hidden');
        
        
        boardCell.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
        
      
        updateStatus('');
    })

    const renderBoard = (board) => {
        boardCell.forEach((cell, index) => {

            cell.textContent = board[index];

            if (board[index] === 'X') cell.classList.add('x');
            else if (board[index] === 'O') cell.classList.add('o');
        })
    }

    const updateStatus = (message) => {

        statusDisplay.textContent = message;

    }




    return { renderBoard, updateStatus }
})()