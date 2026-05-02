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

    // --- EFECTO DE CHISPAS (PARTICLES.JS) ---
    if(document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#ff4500", "#ffd700", "#ff8c00"] }, 
                "shape": { "type": "circle" },
                "opacity": { "value": 0.8, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 4, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": false }, 
                "move": { "enable": true, "speed": 3, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true } },
            "retina_detect": true
        });
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

// 4. SISTEMA DE MODALES (Abre y Cierra Nequi, Galleta y Promo)
function abrirModal(id) {
    const modal = document.getElementById(id);
    const content = document.getElementById(id + 'Content');
    if(modal && content) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100');
        content.classList.remove('scale-75', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }
}

function closeModal(id) {
    // Si no se pasa un ID, asumimos que es el modal promocional antiguo para retrocompatibilidad
    if(!id) id = 'promoModal';
    const modal = document.getElementById(id);
    const content = document.getElementById(id + 'Content');
    if(modal && content) {
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-75', 'opacity-0');
        setTimeout(function() {
            modal.classList.remove('opacity-100');
            modal.classList.add('opacity-0', 'pointer-events-none');
        }, 400); 
    }
}

// Modal Promocional a los 5.5 segundos
setTimeout(function() {
    abrirModal('promoModal');
}, 5500); 

// 5. FUNCIONES ESPECÍFICAS (Nequi y Galleta)
function abrirNequi() {
    abrirModal('nequiModal');
}

function abrirGalleta() {
    const fortunas = [
        "El fuego ancestral del wok guía tu camino. Reclama tu destino con el código: DRAGON10",
        "La sabiduría de la naturaleza recompensa al que sabe esperar. Tu paciencia trae un obsequio: ANCESTRAL26",
        "El equilibrio perfecto entre el viento y la llama está en tu próximo plato. Usa: EQUILIBRIO"
    ];
    const fortunaAzar = fortunas[Math.floor(Math.random() * fortunas.length)];
    document.getElementById('mensajeFortuna').innerText = fortunaAzar;
    abrirModal('galletaModal');
}

// 6. WhatsApp (Menú Flotante)
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

// 8. Copiar Número de Nequi
function copiarNumeroNequi(numero) {
    navigator.clipboard.writeText(numero).then(() => {
        const icono = document.getElementById('iconoCopiar');
        const mensaje = document.getElementById('mensajeCopiado');
        
        icono.classList.remove('fa-copy', 'far');
        icono.classList.add('fa-check', 'fas', 'text-green-400');
        
        mensaje.classList.remove('opacity-0');
        mensaje.classList.add('opacity-100');
        
        setTimeout(() => {
            icono.classList.remove('fa-check', 'fas', 'text-green-400');
            icono.classList.add('fa-copy', 'far');
            mensaje.classList.remove('opacity-100');
            mensaje.classList.add('opacity-0');
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// 9. Visor de Carta Tradicional (Lightbox)
function abrirImagenCarta(src) {
    const visorModal = document.getElementById('visorCartaModal');
    const visorImg = document.getElementById('imagenVisor');
    const content = document.getElementById('visorCartaModalContent');
    
    if (visorModal && visorImg && content) {
        // Le pasamos la ruta de la imagen que tocaste a la imagen gigante
        visorImg.src = src; 
        
        // Mostramos el fondo oscuro
        visorModal.classList.remove('opacity-0', 'pointer-events-none');
        visorModal.classList.add('opacity-100');
        
        // Hacemos el efecto de zoom a la imagen
        content.classList.remove('scale-75', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }
}
