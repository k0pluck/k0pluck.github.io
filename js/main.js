/**
 * Main JavaScript Functionality
 * Handles scroll effects, back-to-top, and general interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== BACK TO TOP BUTTON ====================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Smooth scroll to top on click
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchors
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ==================== HOVER EFFECTS ENHANCEMENT ====================
    // Add subtle hover effect to cards
    document.querySelectorAll('.hover-lift, .cta-card, .alumni-card, .news-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '5';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
    
    // ==================== LAZY LOADING FOR IMAGES ====================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ==================== HEADER SCROLL EFFECT ====================
    const mainHeader = document.querySelector('.main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            mainHeader?.classList.add('scrolled');
        } else {
            mainHeader?.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ==================== FORM VALIDATION (Placeholder for future) ====================
    // Add validation to any forms that might be added later
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            // Prevent default for demo purposes
            // In production, implement proper validation
            // e.preventDefault();
        });
    });
    
    // ==================== KEYBOARD NAVIGATION ====================
    // Allow ESC to close any open modals/dropdowns
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close Bootstrap dropdowns
            document.querySelectorAll('.dropdown-menu.show').forEach(dropdown => {
                const instance = bootstrap.Dropdown.getInstance(dropdown.parentElement);
                instance?.hide();
            });
        }
    });
    
    // ==================== PERFORMANCE: DEBOUNCE UTILITY ====================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Debounced scroll handler for performance
    const debouncedScroll = debounce(() => {
        // Trigger any scroll-dependent updates here
    }, 100);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // ==================== CONSOLE INFO ====================
    console.log('%c🎓 AMIKOM Layout Loaded', 'color: #700070; font-weight: bold; font-size: 14px;');
    console.log('%c✨ Theme: ' + document.documentElement.getAttribute('data-theme'), 'color: #666;');
});