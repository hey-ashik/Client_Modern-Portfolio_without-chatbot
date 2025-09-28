// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ===================================
    // Animated Flip Titles (NEW)
    // ===================================
    function initializeFlipTitles() {
        const DURATION = 0.25;
        const STAGGER = 0.025;

        const animatedTitles = document.querySelectorAll('.animated-title');

        animatedTitles.forEach(title => {
            const text = title.textContent.trim();
            title.innerHTML = ''; // Clear the original text

            const createLayer = (className) => {
                const layer = document.createElement('div');
                layer.className = className;
                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    // Use non-breaking space for empty spaces to preserve them
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.transitionDelay = `${STAGGER * index}s`;
                    layer.appendChild(span);
                });
                return layer;
            };

            const topLayer = createLayer('top-text');
            const bottomLayer = createLayer('bottom-text');

            title.appendChild(topLayer);
            title.appendChild(bottomLayer);
        });
    }

    initializeFlipTitles(); // Run the new function

    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // ===================================
    // Desktop "Slide Tab" Navigation
    // ===================================
    const navLinksContainer = document.querySelector('.nav-links');
    const navIndicator = document.querySelector('.nav-indicator');
    const navItems = document.querySelectorAll('.nav-links li');
    const homeLink = document.querySelector('.nav-links li a[href="#home"]');

    function positionIndicator(element) {
        if (element && navIndicator) {
            navIndicator.style.width = `${element.offsetWidth}px`;
            navIndicator.style.left = `${element.offsetLeft}px`;
        }
    }

    if (homeLink) {
        positionIndicator(homeLink.parentElement);
    }
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => positionIndicator(item));
    });

    if (navLinksContainer && homeLink) {
        navLinksContainer.addEventListener('mouseleave', () => positionIndicator(homeLink.parentElement));
    }
    
    // ===================================
    // Mouse Image Trail Effect
    // ===================================
    const heroSection = document.getElementById('home');
    const imageContainer = document.getElementById('mouse-trail-container');
    
    if (heroSection && imageContainer) {
        const trailImages = Array.from({ length: 16 }, (_, i) => `https://picsum.photos/400/500?random=${i + 1}`);
        const renderImageBuffer = 50;
        const rotationRange = 25;
        let lastRenderPosition = { x: 0, y: 0 };
        let imageRenderCount = 0;
        let imageElements = [];

        trailImages.forEach((src, index) => {
            let img = document.createElement('img');
            img.src = src;
            img.className = 'mouse-trail-image';
            img.dataset.index = index;
            imageContainer.appendChild(img);
            imageElements.push(img);
        });

        const calculateDistance = (x1, y1, x2, y2) => {
            const deltaX = x2 - x1;
            const deltaY = y2 - y1;
            return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        };

        const renderNextImage = () => {
            const imageIndex = imageRenderCount % trailImages.length;
            const el = imageElements[imageIndex];

            el.style.top = `${lastRenderPosition.current.y}px`;
            el.style.left = `${lastRenderPosition.current.x}px`;
            el.style.zIndex = imageRenderCount.toString();

            const rotation = Math.random() * rotationRange;
            const signedRotation = imageIndex % 2 ? rotation : -rotation;

            el.style.transform = `translate(-50%, -50%) scale(0.8) rotate(0deg)`;
            el.style.opacity = '1';
            
            setTimeout(() => {
                el.style.transform = `translate(-50%, -50%) scale(1) rotate(${signedRotation}deg)`;
            }, 10);

            setTimeout(() => {
                el.style.opacity = '0';
            }, 2000);

            imageRenderCount++;
        };
        
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const distance = calculateDistance(clientX, clientY, lastRenderPosition.x, lastRenderPosition.y);

            if (distance >= renderImageBuffer) {
                lastRenderPosition = { x: clientX, y: clientY };
                lastRenderPosition.current = { x: clientX, y: clientY };
                renderNextImage();
            }
        });
    }

    // ===================================
    // Velocity Scroll Text Effect 1
    // ===================================
    const velocitySection = document.getElementById('velocity-section');
    const velocityText = document.getElementById('velocity-text');

    if (velocitySection && velocityText) {
        let lastScrollY = window.scrollY;
        let lastTimestamp = performance.now();
        let scrollVelocity = 0;
        let targetX = 0;
        let targetSkew = 0;
        let currentX = 0;
        let currentSkew = 0;

        const lerp = (start, end, factor) => start * (1 - factor) + end * factor;

        const update = () => {
            const now = performance.now();
            const timeDelta = now - lastTimestamp;
            const scrollDelta = window.scrollY - lastScrollY;
            scrollVelocity = scrollDelta / timeDelta;
            
            lastScrollY = window.scrollY;
            lastTimestamp = now;

            const sectionTop = velocitySection.offsetTop;
            const sectionHeight = velocitySection.offsetHeight;
            const viewportHeight = window.innerHeight;

            const scrollYProgress = Math.max(0, Math.min(1, (window.scrollY - sectionTop) / (sectionHeight - viewportHeight)));
            
            targetX = -4000 * scrollYProgress;
            targetSkew = scrollVelocity * 20;
            targetSkew = Math.max(-45, Math.min(45, targetSkew));

            currentX = lerp(currentX, targetX, 0.075);
            currentSkew = lerp(currentSkew, targetSkew, 0.075);
            
            velocityText.style.transform = `translateX(${currentX}px) skewX(${currentSkew}deg)`;
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }
    
    // ===================================
    // Velocity Scroll Text Effect 2
    // ===================================
    const velocitySection2 = document.getElementById('velocity-section-2');
    const velocityText2 = document.getElementById('velocity-text-2');

    if (velocitySection2 && velocityText2) {
        let lastScrollY2 = window.scrollY;
        let lastTimestamp2 = performance.now();
        let scrollVelocity2 = 0;
        let targetX2 = 0;
        let targetSkew2 = 0;
        let currentX2 = 0;
        let currentSkew2 = 0;

        const lerp2 = (start, end, factor) => start * (1 - factor) + end * factor;

        const update2 = () => {
            const now = performance.now();
            const timeDelta = now - lastTimestamp2;
            const scrollDelta = window.scrollY - lastScrollY2;
            scrollVelocity2 = scrollDelta / timeDelta;
            
            lastScrollY2 = window.scrollY;
            lastTimestamp2 = now;

            const sectionTop = velocitySection2.offsetTop;
            const sectionHeight = velocitySection2.offsetHeight;
            const viewportHeight = window.innerHeight;

            const scrollYProgress = Math.max(0, Math.min(1, (window.scrollY - sectionTop) / (sectionHeight - viewportHeight)));
            
            targetX2 = -2500 * scrollYProgress;
            targetSkew2 = scrollVelocity2 * 20;
            targetSkew2 = Math.max(-45, Math.min(45, targetSkew2));

            currentX2 = lerp2(currentX2, targetX2, 0.075);
            currentSkew2 = lerp2(currentSkew2, targetSkew2, 0.075);
            
            velocityText2.style.transform = `translateX(${currentX2}px) skewX(${currentSkew2}deg)`;
            requestAnimationFrame(update2);
        };
        requestAnimationFrame(update2);
    }

    // ===================================
    // Parallax Showcase Effect (NEW)
    // ===================================
    const parallaxShowcase = document.getElementById('parallax-showcase');
    const stickyElement = document.getElementById('parallax-sticky-element');
    const parallaxImages = document.querySelectorAll('.parallax-image');

    if (parallaxShowcase && stickyElement && parallaxImages.length > 0) {
        const updateParallax = () => {
            const sectionTop = parallaxShowcase.offsetTop;
            const sectionHeight = parallaxShowcase.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            // Calculate scroll progress within the parallax section
            const scrollableHeight = sectionHeight - viewportHeight;
            const scrollYProgress = Math.max(0, Math.min(1, (window.scrollY - sectionTop) / scrollableHeight));
            
            // --- Animate the sticky background element ---
            const clipStart = 25;
            const clipEnd = 0;
            const clip1 = clipStart - (clipStart - clipEnd) * scrollYProgress;
            const clip2 = (100 - clipStart) + (clipStart - clipEnd) * scrollYProgress;
            
            const sizeStart = 170;
            const sizeEnd = 100;
            const backgroundSize = sizeStart - (sizeStart - sizeEnd) * scrollYProgress;
            
            stickyElement.style.clipPath = `polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
            stickyElement.style.backgroundSize = `${backgroundSize}%`;
            
            // --- Animate the individual parallax images ---
            parallaxImages.forEach(img => {
                const startY = parseFloat(img.dataset.start || '0');
                const endY = parseFloat(img.dataset.end || '0');
                
                const translateY = startY + (endY - startY) * scrollYProgress;
                
                img.style.transform = `translateY(${translateY}px)`;
            });
        };
        
        // Initial call to set styles before scrolling
        updateParallax();
        // Update on scroll
        window.addEventListener('scroll', updateParallax);
    }

    // ===================================
    // Smooth scrolling for navigation links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===================================
    // Navbar background change on scroll
    // ===================================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ===================================
    // Gallery lightbox functionality
    // ===================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    window.closeLightbox = function() {
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    };
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
    
    // ===================================
    // Contact form handling
    // ===================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            const submitBtn = this.querySelector('.submit-btn');

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }
            
            // --- Validation ---
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                }
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                }
                return;
            }
            
            // --- Simulate Sending Email ---
            // In a real application, you would send this data to a server
            // or a third-party service like Formspree or EmailJS.
            try {
                // To use a service like Formspree, you would do this:
                /*
                const response = await fetch(this.action, {
                    method: this.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                    this.reset();
                } else {
                    throw new Error('Network response was not ok.');
                }
                */

                // Simulating a delay for demonstration purposes
                await new Promise(resolve => setTimeout(resolve, 1500));

                // This is the simulation part. In reality, the 'fetch' block above would handle it.
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
                console.log('Form submitted (simulation):', { name, email, subject, message });

            } catch (error) {
                showNotification('An error occurred. Please try again.', 'error');
                console.error('Form submission error:', error);
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                }
            }
        });
    }
    
    // ===================================
    // Notification system
    // ===================================
    function showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');
        
        if (notification && notificationText) {
            notificationText.textContent = message;
            
            const icon = notification.querySelector('i');
            if (icon) {
                icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
                icon.style.color = type === 'success' ? '#4CAF50' : '#f44336';
            }
            
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 5000);
        }
    }
    
    // ===================================
    // Intersection Observer for animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Exclude animated titles from this observer to prevent conflicts
    const animatedElements = document.querySelectorAll('.glass-card, .section-title:not(.animated-title)');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Console message
    console.log('%c Welcome to Sagor\'s Portfolio! ', 'background: #000; color: #fff; font-size: 16px; padding: 10px;');
    console.log('%c Feel free to explore and connect! ', 'background: #333; color: #fff; font-size: 14px; padding: 5px;');
});




