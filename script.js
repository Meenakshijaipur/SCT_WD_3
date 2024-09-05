document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart-button');
    let currentPlayer = 'x'; // 'x' or 'o'
    let board = Array(9).fill(null);
    let gameActive = true;

    function checkWin(player) {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winPatterns.some(pattern =>
            pattern.every(index => board[index] === player)
        );
    }

    function handleClick(e) {
        const index = e.target.dataset.index;
        if (board[index] || !gameActive) return;
        board[index] = currentPlayer;
        e.target.classList.add(currentPlayer);
        if (checkWin(currentPlayer)) {
            alert(`${currentPlayer.toUpperCase()} wins`);
            gameActive = false;
        } else if (board.every(cell => cell)) {
            alert("It's a draw!");
            gameActive = false;
        }
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }

    function restartGame() {
        board.fill(null);
        cells.forEach(cell => {
            cell.classList.remove('x', 'o');
        });
        currentPlayer = 'x';
        gameActive = true;
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartButton.addEventListener('click', restartGame);
});