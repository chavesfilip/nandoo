// Website JavaScript - Fernandoo Odoo Expert

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.company || !data.phone) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(data.phone)) {
                showNotification('Por favor, insira um telefone válido.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Consultoria solicitada com sucesso! Nossa equipe entrará em contato em até 24 horas.', 'success');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Track conversion (simulate)
                trackConversion('form_submission', data);
            }, 2000);
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.benefit-card, .service-card, .testimonial-card, .fade-in');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Stats counter animation
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPercentage = finalValue.includes('%');
                const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                
                animateCounter(target, 0, numericValue, 2000, isPercentage);
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);
    
    statsNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateCounter(element, start, end, duration, isPercentage) {
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current + (isPercentage ? '%' : '+');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Urgency timer (simulate limited time offer)
    const urgencyBadge = document.querySelector('.urgency-badge');
    if (urgencyBadge) {
        let availableSpots = 10;
        const updateUrgency = () => {
            if (availableSpots > 0) {
                urgencyBadge.innerHTML = `<i class="fas fa-fire"></i> Apenas ${availableSpots} vagas disponíveis por trimestre`;
            } else {
                urgencyBadge.innerHTML = `<i class="fas fa-clock"></i> Lista de espera disponível`;
                urgencyBadge.style.background = '#6c757d';
            }
        };
        
        // Simulate spots being taken
        setInterval(() => {
            if (Math.random() < 0.1 && availableSpots > 0) {
                availableSpots--;
                updateUrgency();
            }
        }, 30000); // Check every 30 seconds
    }
    
    // WhatsApp button animation
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (whatsappButton) {
        // Add pulse animation every 10 seconds
        setInterval(() => {
            whatsappButton.style.animation = 'none';
            setTimeout(() => {
                whatsappButton.style.animation = 'pulse 1s ease-in-out';
            }, 10);
        }, 10000);
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Track page views and interactions
    trackPageView();
    
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-cta, .cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('cta_click', {
                button_text: this.textContent.trim(),
                button_location: getButtonLocation(this)
            });
        });
    });
    
    // Track WhatsApp clicks
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function() {
            trackEvent('whatsapp_click', {
                source: 'floating_button'
            });
        });
    }
    
    // Track LinkedIn clicks
    const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
    linkedinLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('linkedin_click', {
                source: getButtonLocation(this)
            });
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks);
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
}

// Analytics tracking functions (simulate)
function trackPageView() {
    console.log('Page view tracked:', {
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        referrer: document.referrer,
        user_agent: navigator.userAgent
    });
}

function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', {
        event: eventName,
        properties: properties,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    });
}

function trackConversion(conversionType, data = {}) {
    console.log('Conversion tracked:', {
        type: conversionType,
        data: data,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    });
    
    // Simulate sending to analytics service
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
            'value': 1.0,
            'currency': 'USD'
        });
    }
}

function getButtonLocation(button) {
    const section = button.closest('section');
    if (section) {
        return section.className || section.id || 'unknown_section';
    }
    return 'header_or_footer';
}

// Add CSS for notifications and animations
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
    }
    
    .notification-success {
        background: #d4edda;
        border: 1px solid #c3e6cb;
        color: #155724;
    }
    
    .notification-error {
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
    }
    
    .notification-info {
        background: #d1ecf1;
        border: 1px solid #bee5eb;
        color: #0c5460;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        margin-left: auto;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        color: inherit;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-link.active {
        color: #714B67 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .whatsapp-button {
        animation: pulse 2s infinite;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
        
        .whatsapp-button {
            animation: none;
        }
        
        .whatsapp-button:hover {
            animation: pulse 0.5s ease-in-out;
        }
    }
`;
document.head.appendChild(style);

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

