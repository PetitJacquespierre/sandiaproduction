import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    projectId: "grow-studio-menus",
    appId: "1:152582182898:web:cf17e88b6b1f861cdc7d6b",
    storageBucket: "grow-studio-menus.firebasestorage.app",
    apiKey: "AIzaSyAv7GDSLS3Kwb-aMAhyQE3YgnPkCNg8cvg",
    authDomain: "grow-studio-menus.firebaseapp.com",
    messagingSenderId: "152582182898",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 1. Verificación de Estado Web (Online / Mantenimiento / Kill Switch)
export async function verificarEstadoSitioWeb() {
    try {
        const docSnap = await getDoc(doc(db, "sandia_config", "general"));
        if (docSnap.exists()) {
            const config = docSnap.data();
            if (config.estadoWeb === "SUSPENDIDO") {
                document.body.innerHTML = `
                    <div style="background:#050a15; color:#fff; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:20px; font-family:'Segoe UI',sans-serif;">
                        <img src="img/Isotipo.png" style="width:90px; margin-bottom:20px; filter: grayscale(1);">
                        <h1 style="color:#e62035; margin-bottom:10px;">Sitio Web Temporalmente Fuera de Servicio</h1>
                        <p style="color:#888; max-width:480px; line-height:1.5;">El servicio se encuentra pausado temporalmente. Para más información o consultas sobre eventos deportivos, comunícate con la organización.</p>
                        <a href="https://wa.me/584126574354" style="margin-top:20px; background:#e62035; color:#fff; padding:12px 25px; border-radius:8px; text-decoration:none; font-weight:bold;">Contactar a Soporte</a>
                    </div>
                `;
                return false;
            } else if (config.estadoWeb === "MANTENIMIENTO") {
                document.body.innerHTML = `
                    <div style="background:#050a15; color:#fff; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:20px; font-family:'Segoe UI',sans-serif;">
                        <img src="img/Isotipo.png" style="width:90px; margin-bottom:20px;">
                        <h1 style="color:#f39c12; margin-bottom:10px;">Estamos en Mantenimiento ⚙️</h1>
                        <p style="color:#ccc; max-width:480px; line-height:1.5;">Estamos actualizando la cartelera de eventos deportivos. Volveremos en unos momentos.</p>
                    </div>
                `;
                return false;
            }
        }
        return true;
    } catch (e) {
        console.warn("Error consultando estado web, permitiendo acceso:", e);
        return true;
    }
}

// 2. Obtener Eventos Deportivos desde Firebase
export async function getSandiaEventos() {
    try {
        const querySnapshot = await getDocs(collection(db, "sandia_eventos"));
        const eventos = [];
        querySnapshot.forEach((d) => {
            eventos.push({ id: d.id, ...d.data() });
        });
        return eventos;
    } catch (error) {
        console.error("Error al obtener eventos de Firestore:", error);
        return [];
    }
}

// 3. Obtener Aliados Comerciales desde Firebase
export async function getSandiaAliados() {
    try {
        const querySnapshot = await getDocs(collection(db, "sandia_aliados"));
        const aliados = [];
        querySnapshot.forEach((d) => {
            aliados.push({ id: d.id, ...d.data() });
        });
        return aliados;
    } catch (error) {
        console.error("Error al obtener aliados de Firestore:", error);
        return [];
    }
}
