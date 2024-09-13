let randomNumber, intentosRestantes, intentos, gameOver;

function inicio() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    intentosRestantes = 10;
    intentos = [];
    gameOver = false;
    document.getElementById('respuesta').disabled = false;
    document.getElementById('enviarRespuesta').disabled = false;
    document.getElementById('mensaje').textContent = '';
    document.getElementById('lista-intentos').innerHTML = '';
    document.getElementById('reiniciarJuego').classList.add('hidden');
}

function adivinar() {
    if (gameOver) return;

    const respuestaIngresada = document.getElementById('respuesta');
    const respuesta = parseInt(respuestaIngresada.value, 10);
    
    if (isNaN(respuesta) || respuesta < 1 || respuesta > 100) {
        document.getElementById('mensaje').textContent = 'Por favor, introduce un número válido entre 1 y 100.';
        return;
    }

    if (intentos.includes(respuesta)) {
        document.getElementById('mensaje').textContent = 'Ya has intentado este número.';
        return;
    }

    intentos.push(respuesta);
    intentosRestantes--;
    
    let mensaje = '';
    if (respuesta === randomNumber) {
        mensaje = '¡Felicidades! Adivinaste el número.';
        gameOver = true;
        document.getElementById('respuesta').disabled = true;
        document.getElementById('enviarRespuesta').disabled = true;
    } else if (intentosRestantes === 0) {
        mensaje = `Se acabaron los intentos. El número correcto era ${randomNumber}.`;
        gameOver = true;
        document.getElementById('respuesta').disabled = true;
        document.getElementById('enviarRespuesta').disabled = true;
    } else {
        mensaje = guess < randomNumber ? 'El número es mayor.' : 'El número es menor.';
    }

    document.getElementById('mensaje').textContent = mensaje;

    const lista-intentos = document.getElementById('lista-intentos');
    lista-intentos.innerHTML = '';
    intentos.forEach(intentos => {
        const listItem = document.createElement('li');
        listItem.textContent = intentos;
        lista-intentos.appendChild(listItem);
    });

    if (gameOver) {
        document.getElementById('reiniciarJuego').classList.remove('hidden');
    }
}

function reiniciarJuego() {
    inicio();
}

document.getElementById('enviarRespuesta').addEventListener('click', adivinar);
document.getElementById('reiniciarJuego').addEventListener('click', reiniciarJuego);

// Inicializar el juego cuando la página carga
inicio();
