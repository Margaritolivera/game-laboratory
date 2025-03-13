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

document.addEventListener("DOMContentLoaded", () => {
    updateGameUI();
});

function updateGameUI() {
    const levelNumber = document.getElementById("level-number");
    const regexPattern = document.getElementById("regex-pattern");
    const optionsContainer = document.getElementById("options-container");

    if (!levelNumber || !regexPattern || !optionsContainer) {
        console.error("Error: No se encontraron elementos del DOM.");
        return;
    }

    levelNumber.innerText = currentLevel + 1;
    regexPattern.innerText = levels[currentLevel][currentExercise].pattern;
    optionsContainer.innerHTML = ""; 

    const correctWord = levels[currentLevel][currentExercise].correct;
    const words = generateWordOptions(correctWord);

    words.forEach(word => {
        let button = document.createElement("button");
        button.classList.add("word-button");
        button.innerText = word;
        button.onclick = () => checkAnswer(word);
        optionsContainer.appendChild(button);
    });

    document.getElementById("feedback").innerText = "";
    document.getElementById("next-level").classList.add("hidden");
    document.getElementById("correct-img").classList.add("hidden");
    document.getElementById("wrong-img").classList.add("hidden");
}

function generateWordOptions(correctWord) {
    let words = new Set();
    words.add(correctWord);

    const possibleWords = ["casa", "piso", "luna", "tierra", "sala", "río", "nube", "gato", "perro", "sol",
                           "moto", "pato", "sala", "nido", "calor", "manta", "plata", "cruzo", "blusa", "drago"];

    while (words.size < 4) {
        let randomWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
        words.add(randomWord);
    }

    return Array.from(words).sort(() => Math.random() - 0.5);
}

function checkAnswer(selectedWord) {
    const correctWord = levels[currentLevel][currentExercise].correct;
    const feedback = document.getElementById("feedback");
    const correctImg = document.getElementById("correct-img");
    const wrongImg = document.getElementById("wrong-img");
    const nextLevelButton = document.getElementById("next-level");
    const correctSound = document.getElementById("correct-sound");
    const wrongSound = document.getElementById("wrong-sound");

    if (!feedback || !correctImg || !wrongImg || !nextLevelButton || !correctSound || !wrongSound) {
        console.error("Error: No se encontraron elementos del DOM.");
        return;
    }

    if (selectedWord === correctWord) {
        feedback.innerHTML = "¡Correcto! 🎉";
        feedback.style.color = "green";
        correctImg.classList.remove("hidden");
        correctImg.classList.add("solid-effect");  
        wrongImg.classList.add("hidden");
        nextLevelButton.classList.remove("hidden");
        correctSound.play();
    } else {
        feedback.innerHTML = "Inténtalo de nuevo ❌";
        feedback.style.color = "red";
        correctImg.classList.add("hidden");
        wrongImg.classList.remove("hidden");
        wrongImg.classList.add("solid-effect");  
        wrongSound.play();
    }
}

function nextLevel() {
    currentExercise++;
    if (currentExercise >= levels[currentLevel].length) {
        currentExercise = 0;
        currentLevel++;
        if (currentLevel >= levels.length) {
            alert("¡Felicidades! Terminaste todos los niveles.");
            window.location.href = "index.html";
            return;
        }
    }
    updateGameUI();
}