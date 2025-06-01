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

    const startGame = () => {
        player1 = Player('Earth', 'x');
        player2 = Player('Sin', 'o');
        currentPlayer = player1;

    };

    const playRound = (cellIndex) => {

        let moveStatus = Gameboard.makeMove(cellIndex, currentPlayer.symbol);

        if (moveStatus) {
            let gameStatus = checkGameStatus(Gameboard.getBoard());

            if (gameStatus === 'continue') {
                if (currentPlayer === player1) {
                    currentPlayer = player2;
                }
                else {
                    currentPlayer = player1;
                }
            }
            else {
                console.log(`Game end Result is ${gameStatus}`)
            }

            return true;
        }
        else {
            console.log('move already taken')
            return false;
        }
    };

    const playGame = () => {
        Gameboard.reset();
        startGame();

        let gameResult = 'continue';

        while (gameResult === 'continue') {
            console.log(Gameboard.getBoard());
            console.log(`Current player is ${currentPlayer.name} (${currentPlayer.symbol})`);
            let cellIndex = parseInt(prompt('Enter your move (0-8):'));

            let roundResult = playRound(cellIndex);


            if (!roundResult) {
                continue
            }


            gameResult = checkGameStatus(Gameboard.getBoard());


        }

        console.log("--- FINAL BOARD ---");
        const finalBoard = Gameboard.getBoard();
        console.log(`${finalBoard[0]} | ${finalBoard[1]} | ${finalBoard[2]}`);
        console.log(`--+---+--`);
        console.log(`${finalBoard[3]} | ${finalBoard[4]} | ${finalBoard[5]}`);
        console.log(`--+---+--`);
        console.log(`${finalBoard[6]} | ${finalBoard[7]} | ${finalBoard[8]}`);
        console.log("-------------------");

        
        console.log(`Game over! Result: ${gameResult}`);
    };

    return {playGame};
})()


const ScreenController = (() => {


    
})()