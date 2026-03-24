// 1. Inicializar animaciones de scroll (AOS)
AOS.init({
    once: false, 
    mirror: true
});

// 2. Control del menú móvil (Abrir/Cerrar)
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    if(menu) menu.classList.toggle('hidden');
}

// 3. COREOGRAFÍA DE CARGA Y CARRUSEL REPARADO
document.addEventListener("DOMContentLoaded", function() {
    
    // --- Preloader y aparición del header ---
    const preloader = document.getElementById('preloader');
    const headerBg = document.getElementById('header-bg');
    const headerContent = document.getElementById('header-content');
    const body = document.body;
    
    if (preloader) {
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            body.style.overflowY = 'auto'; 

            if(headerBg) headerBg.classList.remove('opacity-0');
            if(headerContent) headerContent.classList.remove('opacity-0', 'translate-y-10');
        }, 1500);
    }

    // --- CARRUSEL NATIVO FLUIDO REPARADO ---
    const track = document.getElementById('carousel-container'); // ID correcto del track
    const btnPrev = document.getElementById('carousel-prev');    // ID correcto del botón prev
    const btnNext = document.getElementById('carousel-next');    // ID correcto del botón next

    if (track && btnPrev && btnNext) {
        // Obtenemos la primera tarjeta para calcular el ancho dinámicamente
        const firstCard = track.querySelector('.carousel-item');
        
        btnPrev.addEventListener('click', () => {
            // Calculamos la distancia de desplazamiento: ancho de tarjeta + 24px de gap
            const scrollDistance = firstCard ? firstCard.offsetWidth + 24 : 374; 
            track.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
        });

        btnNext.addEventListener('click', () => {
            const scrollDistance = firstCard ? firstCard.offsetWidth + 24 : 374;
            track.scrollBy({ left: scrollDistance, behavior: 'smooth' });
        });
    }
});

// 4. Modal Promocional a los 5.5 segundos
setTimeout(function() {
    const modal = document.getElementById('promoModal');
    const content = document.getElementById('promoModalContent');
    if(modal && content) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100');
        content.classList.remove('scale-75', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }
}, 5500); 

// 5. Cerrar Modal Promocional
function closeModal() {
    const modal = document.getElementById('promoModal');
    const content = document.getElementById('promoModalContent');
    if(modal && content) {
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-75', 'opacity-0');
        setTimeout(function() {
            modal.classList.remove('opacity-100');
            modal.classList.add('opacity-0', 'pointer-events-none');
        }, 400); 
    }
}

// 6. WhatsApp
function toggleWaMenu() {
    const menu = document.getElementById('wa-menu');
    const icon = document.getElementById('wa-icon');
    if (menu && icon) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('flex', 'wa-menu-enter', 'wa-menu-enter-active');
            icon.classList.remove('fa-whatsapp');
            icon.classList.add('fa-times'); 
        } else {
            menu.classList.add('hidden');
            menu.classList.remove('flex', 'wa-menu-enter', 'wa-menu-enter-active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-whatsapp'); 
        }
    }
}

// 7. Scroll suave para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const target = document.querySelector(targetId);
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
