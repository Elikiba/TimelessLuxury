// Timeless Luxury - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Form handling
    initForms();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Animations
    initAnimations();
    
    // Mobile menu
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting based on page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// Form handling
function initForms() {
    // Main reservation form
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
    }
    
    // Rooftop reservation form
    const rooftopForm = document.getElementById('rooftop-reservation-form');
    if (rooftopForm) {
        rooftopForm.addEventListener('submit', handleReservationSubmit);
    }
    
    // Bar reservation form
    const barForm = document.getElementById('bar-reservation-form');
    if (barForm) {
        barForm.addEventListener('submit', handleReservationSubmit);
    }
    
    // Membership form
    const membershipForm = document.getElementById('membership-form');
    if (membershipForm) {
        membershipForm.addEventListener('submit', handleMembershipSubmit);
    }
    
    // Set minimum date to today for all date inputs
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
}

// Handle reservation form submissions
function handleReservationSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic form validation
    if (!validateReservationForm(data)) {
        return;
    }
    
    // Show success message
    showNotification('success', 'Reservation request submitted successfully! We will contact you shortly to confirm.');
    
    // Reset form
    form.reset();
    
    // In a real application, this would send data to a server
    console.log('Reservation data:', data);
}

// Handle membership form submission
function handleMembershipSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic form validation
    if (!validateMembershipForm(data)) {
        return;
    }
    
    // Show success message
    showNotification('success', 'Membership application submitted successfully! Our membership team will review your application and contact you within 48 hours.');
    
    // Reset form
    form.reset();
    
    // In a real application, this would send data to a server
    console.log('Membership application data:', data);
}

// Validate reservation form
function validateReservationForm(data) {
    const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showNotification('error', `Please fill in the ${field} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('error', 'Please enter a valid email address.');
        return false;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
        showNotification('error', 'Please enter a valid phone number.');
        return false;
    }
    
    // Date validation (not in the past)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('error', 'Please select a date that is today or in the future.');
        return false;
    }
    
    return true;
}

// Validate membership form
function validateMembershipForm(data) {
    const requiredFields = ['name', 'email', 'phone', 'membership-tier', 'occupation', 'message'];
    
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            const fieldName = field.replace('-', ' ');
            showNotification('error', `Please fill in the ${fieldName} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('error', 'Please enter a valid email address.');
        return false;
    }
    
    return true;
}

// Show notifications
function showNotification(type, message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '✗'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add notification styles to head if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .notification-icon {
                font-weight: bold;
                font-size: 18px;
            }
            .notification-message {
                flex: 1;
                line-height: 1.4;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize animations on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.dish-card, .cocktail-card, .service-card, .offering-card, .feature-card, .venue-card, .tier-card, .benefit-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Button click handlers
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        const button = e.target;
        const buttonText = button.textContent;
        
        // Handle different button types
        if (buttonText.includes('Menu')) {
            // Scroll to menu section or show menu modal
            const menuSection = document.querySelector('.dishes-grid, .cocktails-grid');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (buttonText.includes('Reservation') || buttonText.includes('Reserve') || buttonText.includes('Book')) {
            // Scroll to contact form
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (buttonText.includes('Apply')) {
            // Scroll to membership form for club page
            const membershipForm = document.querySelector('#membership-form');
            if (membershipForm) {
                membershipForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
});

// Enhanced form experience
document.addEventListener('input', function(e) {
    if (e.target.matches('input, select, textarea')) {
        const field = e.target;
        field.classList.remove('error');
        
        // Real-time validation feedback
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.classList.add('error');
            }
        }
        
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(field.value.replace(/[\s\-\(\)]/g, ''))) {
                field.classList.add('error');
            }
        }
    }
});

// Add CSS for error states and animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #EF4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
    }
    
    .fade-in {
        animation: fadeInUp 0.8s ease-out;
    }
    
    body.menu-open {
        overflow: hidden;
    }
`;
document.head.appendChild(dynamicStyles);