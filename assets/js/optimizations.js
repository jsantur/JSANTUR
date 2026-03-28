// Advanced Performance Optimizations for Interactive Portfolio

// Lazy loading for images with enhanced observer
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Add loading animation
            img.style.opacity = '0';
            img.style.transform = 'scale(0.8)';
            
            // Load image
            img.src = img.dataset.src;
            
            // Fade in animation when loaded
            img.onload = () => {
                img.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                img.classList.remove('lazy-image');
            };
            
            imageObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '100px 0px',
    threshold: 0.01
});

lazyImages.forEach(img => {
    img.style.transition = 'all 0.5s ease';
    imageObserver.observe(img);
});

// Preload critical resources with priority
function preloadCriticalResources() {
    const criticalResources = [
        { href: 'hero-portrait.png', as: 'image', priority: 'high' },
        { href: 'project-webapp.png', as: 'image', priority: 'medium' },
        { href: 'project-mobile.png', as: 'image', priority: 'medium' },
        { href: 'project-desktop.png', as: 'image', priority: 'medium' },
        { href: 'cv-preview.png', as: 'image', priority: 'low' },
        { href: 'Joseph_Santur_CV.pdf', as: 'fetch', priority: 'low' }
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.as;
        link.href = resource.href;
        if (resource.priority === 'high') {
            link.fetchpriority = 'high';
        }
        document.head.appendChild(link);
    });
    
    // Preload fonts with font-display: swap
    const fontPreloads = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Calibre:wght@300;400;500;600;700&display=swap'
    ];
    
    fontPreloads.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = new URL(href).origin;
        document.head.appendChild(link);
        
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = href;
        document.head.appendChild(fontLink);
    });
}

// Enhanced debounce function with immediate option
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

// Smooth scroll with offset and easing
function smoothScrollTo(target, offset = 80) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;
    
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function (easeOutCubic)
        const ease = 1 - Math.pow(1 - percentage, 3);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (progress < duration) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

// Optimized scroll animations with stagger
const scrollElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
};

const displayScrollElement = (element, delay = 0) => {
    setTimeout(() => {
        element.classList.add('animate-in');
    }, delay);
};

const hideScrollElement = (element) => {
    element.classList.remove('animate-in');
};

const handleScrollAnimation = debounce(() => {
    scrollElements.forEach((el, index) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el, index * 100);
        } else if (elementOutofView(el)) {
            hideScrollElement(el);
        }
    });
}, 10);

// Enhanced Intersection Observer with stagger animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate-in');
                
                // Animate skill bars with stagger
                if (entry.target.classList.contains('card')) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach((bar, barIndex) => {
                        setTimeout(() => {
                            bar.style.animation = 'none';
                            bar.offsetHeight;
                            bar.style.animation = `fillBar 1.5s ease-out ${barIndex * 0.1}s forwards`;
                        }, 200);
                    });
                }
                
                // Animate project cards with special effects
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.transform = 'translateY(-8px) scale(1.02)';
                    setTimeout(() => {
                        entry.target.style.transform = '';
                    }, 500);
                }
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Navbar scroll effect with theme support
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

const handleNavbarScroll = debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
}, 10);

// Theme management with system preference detection
class ThemeManager {
    constructor() {
        this.html = document.documentElement;
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeToggleMobile = document.getElementById('theme-toggle-mobile');
        this.currentTheme = localStorage.getItem('theme') || this.getSystemTheme();
        
        this.init();
    }
    
    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
        
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', () => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(this.getSystemTheme());
                }
            });
        }
    }
    
    getSystemTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    setTheme(theme) {
        this.html.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Add transition effect
        this.html.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            this.html.style.transition = '';
        }, 500);
        
        // Save preference
        localStorage.setItem('theme', theme);
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        if (this.themeToggleMobile) {
            this.themeToggleMobile.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Mouse follower with smooth tracking
class MouseFollower {
    constructor() {
        this.follower = document.querySelector('.mouse-follower');
        this.mouseX = 0;
        this.mouseY = 0;
        this.followerX = 0;
        this.followerY = 0;
        this.isVisible = false;
        
        if (this.follower) {
            this.init();
        }
    }
    
    init() {
        this.bindEvents();
        this.updatePosition();
        this.show();
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            if (!this.isVisible) {
                this.show();
            }
        });
        
        // Hide on mouse leave
        document.addEventListener('mouseleave', () => {
            this.hide();
        });
        
        // Hide on mobile
        if ('ontouchstart' in window) {
            this.hide();
        }
    }
    
    updatePosition() {
        // Smooth following with easing
        this.followerX += (this.mouseX - this.followerX) * 0.1;
        this.followerY += (this.mouseY - this.followerY) * 0.1;
        
        this.follower.style.transform = `translate(${this.followerX - 10}px, ${this.followerY - 10}px)`;
        
        requestAnimationFrame(() => this.updatePosition());
    }
    
    show() {
        this.isVisible = true;
        this.follower.style.opacity = '0.7';
    }
    
    hide() {
        this.isVisible = false;
        this.follower.style.opacity = '0';
    }
}

// Scroll progress indicator
class ScrollProgress {
    constructor() {
        this.progressBar = document.querySelector('.scroll-progress');
        
        if (this.progressBar) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        window.addEventListener('scroll', debounce(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
            
            this.progressBar.style.width = scrollPercent + '%';
        }, 5));
    }
}

// Parallax floating elements
class ParallaxFloating {
    constructor() {
        this.elements = document.querySelectorAll('.floating-element');
        
        if (this.elements.length > 0) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset;
            
            this.elements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                const rotation = scrolled * 0.01 * (index + 1);
                
                element.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
            });
        }, 10));
    }
}

// Enhanced mobile menu
class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobile-menu-btn');
        this.menu = document.getElementById('mobile-menu');
        this.isOpen = false;
        
        if (this.menuBtn && this.menu) {
            this.init();
        }
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.menuBtn.addEventListener('click', () => {
            this.toggle();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.menu.contains(e.target) && !this.menuBtn.contains(e.target)) {
                this.close();
            }
        });
        
        // Close menu when clicking on links
        const menuLinks = this.menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.isOpen = true;
        this.menu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate menu items
        const menuItems = this.menu.querySelectorAll('.mobile-nav-link');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }
    
    close() {
        this.isOpen = false;
        this.menu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Enhanced form handling with animations
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        
        if (this.form) {
            this.init();
        }
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Add focus animations to form fields
        const formFields = this.form.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('focus', () => {
                field.style.transform = 'scale(1.02)';
                field.style.boxShadow = '0 0 0 3px rgba(100, 255, 218, 0.2)';
            });
            
            field.addEventListener('blur', () => {
                field.style.transform = 'scale(1)';
                field.style.boxShadow = '';
            });
        });
    }
    
    handleSubmit() {
        const formData = new FormData(this.form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Validation
        if (!name || !email || !message) {
            this.showError('Por favor, completa todos los campos.');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showError('Por favor, ingresa un email válido.');
            return;
        }
        
        // Animate submission
        this.animateSubmission();
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    animateSubmission() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = `
            <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Enviando...
        `;
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Success state
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            submitBtn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                ¡Enviado!
            `;
            
            setTimeout(() => {
                this.showSuccess('¡Gracias por tu mensaje! Te contactaré pronto.');
                this.form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 1500);
        }, 2000);
    }
    
    showError(message) {
        // Create error notification
        this.showNotification(message, 'error');
    }
    
    showSuccess(message) {
        // Create success notification
        this.showNotification(message, 'success');
    }
    
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.style.transition = 'transform 0.3s ease';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical resources
    preloadCriticalResources();
    
    // Initialize components
    const themeManager = new ThemeManager();
    const mouseFollower = new MouseFollower();
    const scrollProgress = new ScrollProgress();
    const parallaxFloating = new ParallaxFloating();
    const mobileMenu = new MobileMenu();
    const contactForm = new ContactForm();
    
    // Setup scroll animations
    window.addEventListener('scroll', handleScrollAnimation);
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Setup smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
            }
        });
    });
    
    // Enhanced hover effects
    document.querySelectorAll('.card, .project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.zIndex = '';
        });
    });
    
    // Observe all animated elements
    scrollElements.forEach(el => {
        animationObserver.observe(el);
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }
    
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
    
    // Welcome message
    console.log(`
    🌟 ¡Bienvenido al Portfolio Avanzado de Joseph Santur! 🌟
    
    ✨ Características implementadas:
    • Tema día/noche con transiciones suaves
    • Efectos flotantes y animaciones avanzadas
    • Seguimiento del mouse con efectos visuales
    • Indicador de progreso de scroll
    • Menú móvil mejorado con animaciones
    • Formulario de contacto con validación
    • Optimizaciones de rendimiento avanzadas
    • Efectos de parallax y transiciones 3D
    
    🚀 Tecnologías utilizadas:
    • HTML5 + CSS3 + JavaScript ES6+
    • Tailwind CSS
    • AOS Animations
    • Custom animations y efectos visuales
    • Intersection Observer API
    • RequestAnimationFrame para animaciones suaves
    
    📧 Contacto: joseph.santur@example.com
    🔗 LinkedIn: linkedin.com/in/josephsantur
    
    💡 Tip: Prueba cambiando el tema y explorando las animaciones!
    `);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Remove event listeners
    window.removeEventListener('scroll', handleScrollAnimation);
    window.removeEventListener('scroll', handleNavbarScroll);
    
    // Disconnect observers
    animationObserver.disconnect();
    imageObserver.disconnect();
    
    // Clear any timeouts or intervals
    const highestTimeoutId = setTimeout(() => {});
    for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}