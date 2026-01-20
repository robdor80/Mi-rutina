import { auth, db } from "../firebase/init.js";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginBtn = document.getElementById("login-btn");
const uploadSection = document.getElementById("upload-section");
const jsonInput = document.getElementById("json-input");
const saveBtn = document.getElementById("save-btn");
const statusMsg = document.getElementById("status-msg");

// --- 1. LOGIN CON GOOGLE ---
const provider = new GoogleAuthProvider();

loginBtn.addEventListener("click", async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error login:", error);
        statusMsg.textContent = "Error al entrar: " + error.message;
    }
});

// Detectar si el usuario ya entró
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Si hay usuario, escondemos botón login y mostramos el formulario
        loginBtn.style.display = "none";
        uploadSection.style.display = "block";
        statusMsg.textContent = `Hola, ${user.displayName} 👋`;
        statusMsg.style.color = "#22c55e"; // Verde
    } else {
        // Si no, mostramos botón login
        loginBtn.style.display = "block";
        uploadSection.style.display = "none";
        statusMsg.textContent = "Identifícate para subir entrenos";
    }
});

// --- 2. GUARDAR EN FIRESTORE ---
saveBtn.addEventListener("click", async () => {
    const jsonText = jsonInput.value;
    
    try {
        // Convertimos el texto en un objeto real (JSON)
        const workoutData = JSON.parse(jsonText);

        // Añadimos la fecha de creación automática
        workoutData.createdAt = serverTimestamp();

        statusMsg.textContent = "Subiendo...";
        
        // Guardamos en la colección "workouts"
        await addDoc(collection(db, "workouts"), workoutData);

        statusMsg.textContent = "✅ ¡Entreno guardado correctamente!";
        jsonInput.value = ""; // Limpiar la caja de texto
        
    } catch (error) {
        console.error(error);
        statusMsg.textContent = "❌ Error: " + error.message;
        statusMsg.style.color = "#ef4444"; // Rojo
    }
});