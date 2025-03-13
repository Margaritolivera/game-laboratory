// Función para mostrar el diálogo de explicaciones
function showExplanation() {
    const dialogueBox = document.getElementById("dialogueBox");
    const explanationBox = document.getElementById("explanationBox");

    dialogueBox.classList.add("hidden"); // Oculta el diálogo inicial
    explanationBox.classList.remove("hidden"); // Muestra el diálogo de explicaciones
}

// Función para ocultar el diálogo de explicaciones
function hideExplanation() {
    const dialogueBox = document.getElementById("dialogueBox");
    const explanationBox = document.getElementById("explanationBox");

    explanationBox.classList.add("hidden"); // Oculta el diálogo de explicaciones
    dialogueBox.classList.remove("hidden"); // Muestra el diálogo inicial
}