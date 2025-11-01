// Script para la funcionalidad del menú hamburguesa
document.getElementById('menu-toggle').addEventListener('click', function() {
    // Muestra/oculta el menú principal al hacer clic en el botón
    document.getElementById('main-nav').classList.toggle('active');
});

// Script para cerrar el menú en móviles cuando haces clic en un enlace de navegación
document.querySelectorAll('.main-nav a').forEach(item => {
    item.addEventListener('click', () => {
        // Cierra el menú cuando se hace clic en cualquier enlace (para ir a una sección)
        document.getElementById('main-nav').classList.remove('active');
    });
});
