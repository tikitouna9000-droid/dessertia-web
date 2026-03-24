document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    
    let currentIndex = 0;
    const slideInterval = 2000; // 2 segundos entre giros
    let autoPlay;

    const updateCarousel = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    const nextSlide = () => {
        // Obtenemos cuántos slides se muestran según el ancho de pantalla
        const visibleSlides = window.innerWidth > 1024 ? 3 : (window.innerWidth > 480 ? 2 : 1);
        const totalSlides = slides.length;

        currentIndex++;

        // Si llegamos al final de los slides reales (sin contar los clones del final)
        // O si ya no quedan suficientes slides para llenar el hueco
        if (currentIndex > totalSlides - visibleSlides) {
            currentIndex = 0;
            // Quitamos la transición momentáneamente para que el salto no se note
            track.style.transition = 'none';
            updateCarousel();
            
            // Forzamos un reflow y volvemos a poner la transición para el siguiente movimiento
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
                nextSlide();
            }, 50);
            return;
        }

        updateCarousel();
    };

    const startAutoPlay = () => {
        autoPlay = setInterval(nextSlide, slideInterval);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlay);
    };

    // Iniciar el carrusel
    startAutoPlay();

    // Pausar al pasar el mouse
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Ajustar en caso de que cambie el tamaño de la ventana
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });

    // Lógica de Lightbox (Ver imagen en grande)
    const modal = document.getElementById('imageModal');
    const fullImg = document.getElementById('fullImage');
    const closeBtn = document.querySelector('.modal-close');

    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            const img = slide.querySelector('img');
            fullImg.src = img.src;
            modal.style.display = 'flex';
            stopAutoPlay(); // Pausar carrusel mientras se ve la foto
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
        startAutoPlay(); // Reanudar carrusel
    };

    closeBtn.addEventListener('click', closeModal);
    
    // Cerrar al hacer clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });
});
