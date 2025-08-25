
        // Preloader
        window.addEventListener('load', function() {
            const preloader = document.getElementById('preloader');
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'auto';
                // Initialize animations after preloader
                setTimeout(() => {
                    initScrollAnimations();
                    initTypingEffect();
                    initParallaxEffect();
                }, 500);
            }, 3000);
        });

        // Initially hide overflow during loading
        document.body.style.overflow = 'hidden';
        // Page Navigation
        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Re-initialize scroll animations
            setTimeout(initScrollAnimations, 100);
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll animations
        function initScrollAnimations() {
            const scrollElements = document.querySelectorAll('.scroll-animation');
            
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

            const displayScrollElement = (element) => {
                element.classList.add('animate');
            };

            const hideScrollElement = (element) => {
                element.classList.remove('animate');
            };

            const handleScrollAnimation = () => {
                scrollElements.forEach((el) => {
                    if (elementInView(el, 1.25)) {
                        displayScrollElement(el);
                    } else if (elementOutofView(el)) {
                        hideScrollElement(el);
                    }
                });
            };

            window.addEventListener('scroll', handleScrollAnimation);
            handleScrollAnimation(); // Initial check
        }

        // Particle system
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                
                // Random animation delay
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                
                particlesContainer.appendChild(particle);
            }
        }

        // Interactive card hover effects
        function initCardEffects() {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-15px) rotateX(5deg)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) rotateX(0)';
                });
            });
        }

        // Gallery interactive effects
        function initGalleryEffects() {
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                item.addEventListener('click', function() {
                    this.style.animation = 'pulse 0.6s ease';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 600);
                });
            });
        }

        // Smooth scroll for CTA button
        document.addEventListener('DOMContentLoaded', function() {
            const ctaButton = document.querySelector('.cta-button');
            if (ctaButton) {
                ctaButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    showPage('rooftop');
                });
            }
        });

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            initScrollAnimations();
            initCardEffects();
            initGalleryEffects();
            
            // Add some dynamic effects
            setInterval(() => {
                const particles = document.querySelectorAll('.particle');
                particles.forEach(particle => {
                    if (Math.random() > 0.98) {
                        particle.style.opacity = Math.random() * 0.8 + 0.2;
                    }
                });
            }, 2000);
        });

        // Add pulse animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

        // Mobile menu toggle (for responsive design)
        function initMobileMenu() {
            const navMenu = document.querySelector('.nav-menu');
            const menuButton = document.createElement('button');
            menuButton.innerHTML = '☰';
            menuButton.className = 'mobile-menu-btn';
            menuButton.style.cssText = `
                display: none;
                background: none;
                border: none;
                color: var(--gold);
                font-size: 1.5rem;
                cursor: pointer;
            `;

            // Add mobile styles
            const mobileStyle = document.createElement('style');
            mobileStyle.textContent = `
                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: block !important;
                    }
                    .nav-menu {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        background: rgba(2, 3, 53, 0.95);
                        backdrop-filter: blur(20px);
                        flex-direction: column;
                        padding: 1rem;
                        border-top: 1px solid rgba(255, 223, 0, 0.2);
                    }
                    .nav-menu.active {
                        display: flex !important;
                    }
                    .nav-menu li {
                        margin: 0.5rem 0;
                    }
                }
            `;
            document.head.appendChild(mobileStyle);

            menuButton.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            document.querySelector('.nav-container').appendChild(menuButton);
        }

        // Enhanced loading animation
        function initLoadingAnimation() {
            const body = document.body;
            body.style.opacity = '0';
            
            window.addEventListener('load', () => {
                setTimeout(() => {
                    body.style.transition = 'opacity 1s ease-in-out';
                    body.style.opacity = '1';
                }, 100);
            });
        }

        // Initialize mobile menu
        initMobileMenu();
        initLoadingAnimation();

        // Add floating elements animation
        function createFloatingElements() {
            const floatingContainer = document.createElement('div');
            floatingContainer.className = 'floating-elements';
            floatingContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
            `;

            for (let i = 0; i < 10; i++) {
                const element = document.createElement('div');
                element.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 100 + 50}px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, var(--gold), transparent);
                    opacity: 0.1;
                    animation: floatAcross ${Math.random() * 20 + 10}s linear infinite;
                    top: ${Math.random() * 100}%;
                    left: -100px;
                `;
                floatingContainer.appendChild(element);
            }

            document.body.appendChild(floatingContainer);

            // Add floating animation
            const floatingStyle = document.createElement('style');
            floatingStyle.textContent = `
                @keyframes floatAcross {
                    from {
                        transform: translateX(-100px);
                        opacity: 0;
                    }
                    50% {
                        opacity: 0.3;
                    }
                    to {
                        transform: translateX(calc(100vw + 100px));
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(floatingStyle);
        }

        // Initialize floating elements
        setTimeout(createFloatingElements, 2000);

        // Add typing effect for hero text
        function initTypingEffect() {
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const text = heroTitle.textContent;
                heroTitle.textContent = '';
                heroTitle.style.borderRight = '3px solid var(--gold)';
                
                let i = 0;
                const typeWriter = () => {
                    if (i < text.length) {
                        heroTitle.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    } else {
                        setTimeout(() => {
                            heroTitle.style.borderRight = 'none';
                        }, 1000);
                    }
                };
                
                setTimeout(typeWriter, 1500);
            }
        }

        // Add parallax effect
        function initParallaxEffect() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                
                const particles = document.querySelectorAll('.particle');
                particles.forEach((particle, index) => {
                    const speed = (index % 3 + 1) * 0.1;
                    particle.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });
        }

        // Initialize effects with delay
        setTimeout(() => {
            initTypingEffect();
            initParallaxEffect();
        }, 1000);

        // Add interactive logo animation
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('mouseenter', function() {
                const logoIcon = this.querySelector('.logo-icon');
                logoIcon.style.animation = 'rotate 0.8s ease-in-out';
            });
            
            logo.addEventListener('animationend', function() {
                const logoIcon = this.querySelector('.logo-icon');
                logoIcon.style.animation = '';
            });
        }

        // Add rotate animation
        const rotateStyle = document.createElement('style');
        rotateStyle.textContent = `
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(rotateStyle);

        // Enhanced card interactions
        function enhanceCardInteractions() {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    // Create ripple effect
                    const ripple = document.createElement('div');
                    ripple.style.cssText = `
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 223, 0, 0.3);
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                    `;
                    
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = '50%';
                    ripple.style.top = '50%';
                    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }

        // Add ripple animation
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: translate(-50%, -50%) scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);

        // Initialize enhanced interactions
        setTimeout(enhanceCardInteractions, 500);