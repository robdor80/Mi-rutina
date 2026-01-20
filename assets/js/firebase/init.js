// assets/js/firebase/init.js

// IMPORTANTE: Usamos las URLs completas (CDN) para que funcione en el navegador sin instalar nada
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Importamos tus claves desde la carpeta anterior (nota los dos puntos ..)
import { firebaseConfig } from "../config.js";

// 1. Arrancar la App con tus claves
const app = initializeApp(firebaseConfig);

// 2. Exportar las herramientas para usarlas en el resto de la web
export const db = getFirestore(app);
export const auth = getAuth(app);

console.log("🔥 Firebase inicializado correctamente");