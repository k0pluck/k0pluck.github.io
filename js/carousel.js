/**
 * Enhanced Carousel Functionality
 * Adds auto-play pause on hover and smooth transitions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Hero Carousel
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const carouselInstance = bootstrap.Carousel.getInstance(heroCarousel) || 
                               new bootstrap.Carousel(heroCarousel, {
                                   interval: 6000,
                                   wrap: true,
                                   pause: 'hover',
                                   keyboard: true
                               });
        
        // Pause on hover for better UX
        heroCarousel.addEventListener('mouseenter', () => {
            carouselInstance.pause();
        });
        
        heroCarousel.addEventListener('mouseleave', () => {
            carouselInstance.cycle();
        });
    }
    
    // Alumni Carousel
    const alumniCarousel = document.getElementById('alumniCarousel');
    if (alumniCarousel) {
        new bootstrap.Carousel(alumniCarousel, {
            interval: 8000,
            wrap: true,
            pause: 'hover',
            touch: true
        });
    }
    
    // Add animation classes to carousel items when they become active
    document.querySelectorAll('.carousel').forEach(carousel => {
        carousel.addEventListener('slid.bs.carousel', (event) => {
            const activeItems = event.relatedTarget.querySelectorAll('.animate__animated');
            activeItems.forEach(item => {
                // Reset animation
                item.classList.remove('animate__fadeInUp');
                void item.offsetWidth; // Trigger reflow
                item.classList.add('animate__fadeInUp');
            });
        });
    });
});