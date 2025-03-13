const levels = [
    // Nivel 1 - Fácil
    [ { pattern: "^c.*a$", correct: "casa" }, { pattern: "^p.*o$", correct: "pato" },
      { pattern: "^m.*o$", correct: "moto" }, { pattern: "^s.*a$", correct: "sala" },
      { pattern: "^t.*o$", correct: "taco" } ],

    // Nivel 2 - Fácil
    [ { pattern: "^l.*e$", correct: "lote" }, { pattern: "^r.*a$", correct: "rana" },
      { pattern: "^g.*o$", correct: "gato" }, { pattern: "^p.*a$", correct: "pala" },
      { pattern: "^n.*o$", correct: "nido" } ],

    // Nivel 3 - Intermedio
    [ { pattern: "^[aeiou]m.*$", correct: "amar" }, { pattern: "^[aeiou]s.*$", correct: "usar" },
      { pattern: "^[aeiou]t.*$", correct: "atar" }, { pattern: "^[aeiou]n.*$", correct: "unir" },
      { pattern: "^[aeiou]d.*$", correct: "idea" } ],

    // Nivel 4 - Intermedio
    [ { pattern: "^[mps]ar.*$", correct: "marco" }, { pattern: "^[dtn]or.*$", correct: "torre" },
      { pattern: "^[gvr]es.*$", correct: "gesto" }, { pattern: "^[flc]al.*$", correct: "calor" },
      { pattern: "^[bkm]an.*$", correct: "manta" } ],

    // Nivel 5 - Difícil
    [ { pattern: "^tr[aeiou].*o$", correct: "trazo" }, { pattern: "^pl[aeiou].*a$", correct: "plata" },
      { pattern: "^cr[aeiou].*o$", correct: "cruzo" }, { pattern: "^bl[aeiou].*a$", correct: "blusa" },
      { pattern: "^dr[aeiou].*o$", correct: "drago" } ]
];

let currentLevel = 0;
let currentExercise = 0;
let points = 0; // Puntos del jugador
let timerInterval;

const TIMER_DURATION = 30;

function startTimer() {
    let timeLeft = TIMER_DURATION;
    document.getElementById("timer").innerText = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Tiempo agotado!");
            nextLevel();
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    updateGameUI();
    document.getElementById("submit-answer").addEventListener("click", checkAnswer);
});

function updateGameUI() {
    const levelNumber = document.getElementById("level-number");
    const regexPattern = document.getElementById("regex-pattern");

    if (!levelNumber || !regexPattern) {
        console.error("Error: No se encontraron elementos del DOM.");
        return;
    }

    levelNumber.innerText = currentLevel + 1;
    regexPattern.innerText = levels[currentLevel][currentExercise].pattern;

    // Limpia el campo de entrada y el mensaje de retroalimentación
    document.getElementById("user-input").value = "";
    document.getElementById("feedback").innerText = "";
    document.getElementById("next-level").classList.add("hidden");
    document.getElementById("correct-img").classList.add("hidden");
    document.getElementById("wrong-img").classList.add("hidden");

    clearInterval(timerInterval);
    startTimer();
}

function checkAnswer() {
    const userAnswer = document.getElementById("user-input").value.trim().toLowerCase();
    const correctAnswer = levels[currentLevel][currentExercise].correct;
    const feedback = document.getElementById("feedback");
    const correctImg = document.getElementById("correct-img");
    const wrongImg = document.getElementById("wrong-img");
    const correctSound = document.getElementById("correct-sound");
    const wrongSound = document.getElementById("wrong-sound");

    if (!feedback || !correctImg || !wrongImg || !correctSound || !wrongSound) {
        console.error("Error: No se encontraron elementos del DOM.");
        return;
    }

    if (userAnswer === correctAnswer) {
        feedback.innerHTML = "¡Correcto! 🎉";
        feedback.style.color = "green";
        correctImg.classList.remove("hidden");
        wrongImg.classList.add("hidden");
        correctSound.play();

        // Añade puntos
        points += 10;
        document.getElementById("points").innerText = points;

        // Avanza al siguiente ejercicio
        currentExercise++;

        // Verifica si se completaron todos los ejercicios del nivel
        if (currentExercise >= levels[currentLevel].length) {
            document.getElementById("next-level").classList.remove("hidden");
            clearInterval(timerInterval);
        } else {
            updateGameUI();
        }
    } else {
        feedback.innerHTML = "Incorrecto ❌";
        feedback.style.color = "red";
        correctImg.classList.add("hidden");
        wrongImg.classList.remove("hidden");
        wrongSound.play();
    }
}

function nextLevel() {
    if (currentLevel < levels.length - 1) {
        currentLevel++;
        currentExercise = 0;
        updateGameUI();
    } else {
        alert("¡Felicidades! Has completado todos los niveles.");
        window.location.href = "index.html";
    }
}

// Función para salir del juego
function exitGame() {
    if (confirm("¿Seguro que deseas salir del juego?")) {
        window.location.href = "index.html"; // Redirige a la página principal
    }
}
