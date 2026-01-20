// assets/js/firebase/init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseConfig } from "../config.js";

// 1. Inicializar la App
const app = initializeApp(firebaseConfig);

// 2. Exportar los servicios para usarlos en otros archivos
export const db = getFirestore(app);
export const auth = getAuth(app);

console.log("🔥 Firebase inicializado correctamente");