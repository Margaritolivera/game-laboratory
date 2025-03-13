// auth.js

// Función para registrar un usuario
function registerUser() {
    const username = document.getElementById("username").value.trim();

    if (!username) {
        alert("Por favor, ingresa un nombre de usuario.");
        return;
    }

    // Guardar el usuario en localStorage
    localStorage.setItem("currentUser", username);
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    window.location.href = "login.html"; // Redirigir al login
}

// Función para iniciar sesión
function loginUser() {
    const username = document.getElementById("username").value.trim();

    if (!username) {
        alert("Por favor, ingresa un nombre de usuario.");
        return;
    }

    // Verificar si el usuario existe
    const currentUser = localStorage.getItem("currentUser");

    if (username === currentUser) {
        alert("¡Inicio de sesión exitoso!");
        window.location.href = "../../game.html"; // Redirigir al juego
    } else {
        alert("Usuario no encontrado. Regístrate primero.");
    }
}