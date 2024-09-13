let randomNumber, attemptsLeft, attempts, gameOver;

function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 10;
    attempts = [];
    gameOver = false;
    document.getElementById('guess').disabled = false;
    document.getElementById('submitGuess').disabled = false;
    document.getElementById('message').textContent = '';
    document.getElementById('attemptsList').innerHTML = '';
    document.getElementById('restartGame').classList.add('hidden');
}

function handleGuess() {
    if (gameOver) return;

    const guessInput = document.getElementById('guess');
    const guess = parseInt(guessInput.value, 10);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById('message').textContent = 'Por favor, introduce un número válido entre 1 y 100.';
        return;
    }

    if (attempts.includes(guess)) {
        document.getElementById('message').textContent = 'Ya has intentado este número.';
        return;
    }

    attempts.push(guess);
    attemptsLeft--;
    
    let message = '';
    if (guess === randomNumber) {
        message = '¡Felicidades! Adivinaste el número.';
        gameOver = true;
        document.getElementById('guess').disabled = true;
        document.getElementById('submitGuess').disabled = true;
    } else if (attemptsLeft === 0) {
        message = `Se acabaron los intentos. El número correcto era ${randomNumber}.`;
        gameOver = true;
        document.getElementById('guess').disabled = true;
        document.getElementById('submitGuess').disabled = true;
    } else {
        message = guess < randomNumber ? 'El número es mayor.' : 'El número es menor.';
    }

    document.getElementById('message').textContent = message;

    const attemptsList = document.getElementById('attemptsList');
    attemptsList.innerHTML = '';
    attempts.forEach(attempt => {
        const listItem = document.createElement('li');
        listItem.textContent = attempt;
        attemptsList.appendChild(listItem);
    });

    if (gameOver) {
        document.getElementById('restartGame').classList.remove('hidden');
    }
}

function restartGame() {
    startGame();
}

document.getElementById('submitGuess').addEventListener('click', handleGuess);
document.getElementById('restartGame').addEventListener('click', restartGame);

// Inicializar el juego cuando la página carga
startGame();