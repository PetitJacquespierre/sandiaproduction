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
});
