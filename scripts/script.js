const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const updateBoard = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return {
        getBoard,
        updateBoard,
        resetBoard,
    };
})();

const player = (name, marker) => {
    return  {name, marker};
};

const GameController = (() => {
    const player1 = player("player1", "X");
    const player2 = player("player2", "O");
    let currentPlayer = player1;
    let gameIsActive = true;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWin = () => {
        const board = Gameboard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6],           // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                return true;
            } 
        }
        return false;
    };
    
    const checkTie = () => {
        return Gameboard.getBoard().every(cell => cell !== "");
    }

    const handleTurn = (index) => {
        if (gameIsActive && Gameboard.updateBoard(index, currentPlayer.marker)) {
            if (checkWin()) {
                document.getElementById("game-status").textContent = `${currentPlayer.name} wins!`;
                gameIsActive = false
            } else if (checkTie()) {
                document.getElementById("game-status").textContent = "It's a tie!";
            } else {
                switchPlayer();
            }
            renderBoard();
        }
    };

    const resetGame = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
        gameIsActive = true;
        document.getElementById("game-status").textContent = "";
        renderBoard();
    };

    return {handleTurn, resetGame};


})();
