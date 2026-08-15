// ==========================================================================
// LÓGICA COMPARTIDA (MENÚ Y NAVEGACIÓN)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL MENÚ LATERAL ---
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    function toggleMenu() {
        if(sideMenu) sideMenu.classList.toggle('active');
        if(menuOverlay) menuOverlay.classList.toggle('active');
        if(openMenuBtn) openMenuBtn.classList.toggle('active'); 
    }

    if(openMenuBtn) openMenuBtn.addEventListener('click', toggleMenu);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    if(menuOverlay) menuOverlay.addEventListener('click', toggleMenu);

    // --- ESTADO ACTIVO DEL MENÚ (ESCRITORIO) ---
    function setMenuActivo() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.menu-desktop-links a');
        
        navLinks.forEach(link => {
            link.classList.remove('activo');
            const href = link.getAttribute('href');
            
            if (!href || href === '#') return;
            
            // Lógica simple para determinar página activa
            if (currentPath.includes('calendario.html') && href.includes('calendario.html')) {
                link.classList.add('activo');
            } else if (currentPath.includes('coffeerun.html') && href.includes('calendario.html')) {
                // Las páginas de eventos individuales resaltan el calendario
                link.classList.add('activo');
            } else if ((currentPath.endsWith('/') || currentPath.includes('index.html')) && href.includes('index.html') && !href.includes('#')) {
                link.classList.add('activo');
            }
        });
    }
    
    setMenuActivo();

    // --- REGISTRAR SERVICE WORKER (PWA) ---
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => {
            console.log('Error al registrar Service Worker:', err);
        });
    }

    // --- INYECTAR BOTÓN "VOLVER ARRIBA" Y TOAST ---
    const topBtn = document.createElement('button');
    topBtn.id = 'back-to-top';
    topBtn.innerHTML = '▲';
    topBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
});

// --- FUNCIÓN GLOBAL PARA MOSTRAR TOAST ---
window.showToast = function(message, backgroundColor = 'rgba(46, 204, 113, 0.95)') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerText = message;
    toast.style.background = backgroundColor;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- TOGGLE RUTINA SEMANAL ---
window.toggleRutina = function() {
    const rutinaContainer = document.getElementById('rutina-semanal');
    if (rutinaContainer) {
        rutinaContainer.classList.toggle('active');
        // Auto-scroll a la rutina al abrirla
        if (rutinaContainer.classList.contains('active')) {
            setTimeout(() => {
                rutinaContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        }
    }
}
