// ==========================================================================
// CRAFTED BY GROW STUDIO - DIGITAL ENGINEERING & PRODUCT DESIGN
// https://growstudioweb.vercel.app/
// ==========================================================================
console.log(
    "%c🍉 Sandía Production %c| Crafted with ⚡ by Grow Studio (https://growstudioweb.vercel.app/)",
    "background: #e62035; color: #ffffff; padding: 4px 10px; border-radius: 4px 0 0 4px; font-weight: 800; font-size: 11px;",
    "background: #03060d; color: #00c6eb; padding: 4px 10px; border-radius: 0 4px 4px 0; font-weight: 700; font-size: 11px; border: 1px solid #1a1a2e;"
);

// ==========================================================================
// LÓGICA COMPARTIDA (MENÚ Y NAVEGACIÓN)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    
    // --- LÓGICA DEL MENÚ LATERAL ---
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    window.toggleMenu = function() {
        if(sideMenu) sideMenu.classList.toggle('active');
        if(menuOverlay) menuOverlay.classList.toggle('active');
        if(openMenuBtn) openMenuBtn.classList.toggle('active'); 
    };

    window.cerrarMenu = function() {
        if(sideMenu) sideMenu.classList.remove('active');
        if(menuOverlay) menuOverlay.classList.remove('active');
        if(openMenuBtn) openMenuBtn.classList.remove('active');
    };

    if(openMenuBtn) openMenuBtn.addEventListener('click', window.toggleMenu);
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', window.cerrarMenu);
    if(menuOverlay) menuOverlay.addEventListener('click', window.cerrarMenu);

    document.querySelectorAll('.side-menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(window.cerrarMenu, 100);
        });
    });

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

    // --- GROW STUDIO - EASTER EGG (TOQUE MÁGICO EN LOGO Y KONAMI) ---
    const brandLogos = document.querySelectorAll('.logo-wrapper img, .navbar-sandia img, #sandia-logo');
    brandLogos.forEach(logo => {
        let pressTimer;
        let lastTap = 0;

        const triggerMagic = () => {
            logo.classList.remove('grow-magic-active');
            void logo.offsetWidth; // Forzar reflow
            logo.classList.add('grow-magic-active');
            if (window.showToast) {
                window.showToast("🍉 Sandía Mode: ¡Pasión Runner Activada! ⚡", "rgba(230, 32, 53, 0.95)");
            }
            setTimeout(() => logo.classList.remove('grow-magic-active'), 1400);
        };

        // Doble clic o doble toque rápido
        logo.addEventListener('click', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 350 && tapLength > 0) {
                triggerMagic();
                e.preventDefault();
            }
            lastTap = currentTime;
        });

        // Mantener presionado en móviles y escritorio
        logo.addEventListener('mousedown', () => { pressTimer = setTimeout(triggerMagic, 1200); });
        logo.addEventListener('mouseup', () => clearTimeout(pressTimer));
        logo.addEventListener('mouseleave', () => clearTimeout(pressTimer));
        logo.addEventListener('touchstart', () => { pressTimer = setTimeout(triggerMagic, 1200); }, { passive: true });
        logo.addEventListener('touchend', () => clearTimeout(pressTimer));
        logo.addEventListener('touchcancel', () => clearTimeout(pressTimer));
    });

    // Código Konami Runner (Teclas: ArrowUp, ArrowUp, ArrowDown, ArrowDown, s, a, n, d, i, a)
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
    let konamiIndex = 0;
    window.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                konamiIndex = 0;
                brandLogos.forEach(logo => {
                    logo.classList.add('grow-magic-active');
                    setTimeout(() => logo.classList.remove('grow-magic-active'), 1400);
                });
                if (window.showToast) {
                    window.showToast("⚡ Sandía Production x Grow Studio 🚀", "rgba(0, 198, 235, 0.95)");
                }
            }
        } else {
            konamiIndex = 0;
        }
    });
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

// --- TOGGLE CRONOGRAMA RUN FREE (MENSUAL) ---
window.toggleCronogramaRunFree = function() {
    const cronoContainer = document.getElementById('cronograma-runfree');
    const rutinaContainer = document.getElementById('rutina-semanal');
    
    // Cerrar la rutina si está abierta para mantener la vista limpia
    if (rutinaContainer && rutinaContainer.classList.contains('active')) {
        rutinaContainer.classList.remove('active');
    }

    if (cronoContainer) {
        const estaAbriendo = !cronoContainer.classList.contains('active');
        cronoContainer.classList.toggle('active');
        
        if (estaAbriendo) {
            setTimeout(() => {
                cronoContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    }
}

// --- TOGGLE RUTINA SEMANAL ---
window.toggleRutina = function() {
    const rutinaContainer = document.getElementById('rutina-semanal');
    const cronoContainer = document.getElementById('cronograma-runfree');

    // Cerrar el cronograma mensual si está abierto
    if (cronoContainer && cronoContainer.classList.contains('active')) {
        cronoContainer.classList.remove('active');
    }

    if (rutinaContainer) {
        const estaAbriendo = !rutinaContainer.classList.contains('active');
        rutinaContainer.classList.toggle('active');
        
        if (estaAbriendo) {
            setTimeout(() => {
                rutinaContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    }
}
