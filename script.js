// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const slideInterval = 5000; // 5 seconds

    // Caption content for each slide
    const slideCaptions = [
        {
            title: "Innovative Technology Solutions",
            description: "Cutting-edge IT consultancy and digital transformation services to propel your business into the future."
        },
        {
            title: "Professional Graphic Design",
            description: "Creative branding, logos, and visual identity solutions that make your brand stand out in the digital landscape."
        },
        {
            title: "Multimedia Excellence",
            description: "Video production, animation, and interactive media solutions that engage and captivate your audience."
        },
        {
            title: "Online Education & Training",
            description: "Comprehensive online courses in graphic design and multimedia to empower the next generation of creators."
        }
    ];

    function updateCaptions(slideIndex) {
        const heroTitle = document.getElementById('heroTitle');
        const heroDescription = document.getElementById('heroDescription');
        
        // Fade out current captions
        heroTitle.classList.add('fade-out');
        heroDescription.classList.add('fade-out');
        
        // Update content after fade out
        setTimeout(() => {
            heroTitle.textContent = slideCaptions[slideIndex].title;
            heroDescription.textContent = slideCaptions[slideIndex].description;
            
            // Fade in new captions
            heroTitle.classList.remove('fade-out');
            heroDescription.classList.remove('fade-out');
            heroTitle.classList.add('fade-in');
            heroDescription.classList.add('fade-in');
            
            // Remove fade-in class after animation
            setTimeout(() => {
                heroTitle.classList.remove('fade-in');
                heroDescription.classList.remove('fade-in');
            }, 500);
        }, 250);
    }

    function goToSlide(slideIndex) {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Update current slide
        currentSlide = slideIndex;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Update captions
        updateCaptions(slideIndex);
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    // Auto-advance slides
    let slideTimer = setInterval(nextSlide, slideInterval);

    // Pause auto-advance on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', () => {
            clearInterval(slideTimer);
        });

        heroSection.addEventListener('mouseleave', () => {
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    }

    // Make goToSlide function globally available
    window.goToSlide = goToSlide;
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Modal functionality
const modal = document.getElementById('quoteModal');
const quoteForm = document.getElementById('quoteForm');
const newsletterForm = document.getElementById('newsletterForm');

function openQuoteModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeQuoteModal();
    }
});

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeQuoteModal();
    }
});

// Quote form submission
quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Add timestamp
    data.timestamp = new Date().toISOString();
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Send data to Google Apps Script
    sendToGoogleSheet(data)
        .then(response => {
            showNotification('Quote request submitted successfully! We\'ll get back to you soon.', 'success');
            this.reset();
            closeQuoteModal();
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            showNotification('Sorry, there was an error submitting your request. Please try again or contact us directly.', 'error');
        })
        .finally(() => {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
});

// Function to send data to Google Apps Script
async function sendToGoogleSheet(data) {
    // Replace this URL with your actual Google Apps Script web app URL
    // Make sure to create a NEW deployment with "Anyone" access
    const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzsAxyDg1vQ6fx1p_WE2w0090ui25nS-AgpntWmX2GxDT80Lka8qWHfMiSuxwmnORM/exec';
    
    try {
        // Check if we're running locally (file:// protocol)
        if (window.location.protocol === 'file:') {
            console.warn('Running locally - CORS may be blocked. Consider using a local server.');
            // For local testing, you can simulate the submission
            console.log('Form data that would be sent:', data);
            // Simulate a successful response for testing
            return 'success (local testing)';
        }
        
        const response = await fetch(GAS_WEBAPP_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors' // Explicitly set CORS mode
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.text();
        console.log('Form submitted successfully:', result);
        return result;
    } catch (error) {
        console.error('Error sending data to Google Sheet:', error);
        
        // If it's a CORS error, provide helpful information
        if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
            console.error('CORS Error detected. This usually happens when:');
            console.error('1. Running the site from file:// protocol (local files)');
            console.error('2. Google Apps Script is not properly deployed');
            console.error('3. Network connectivity issues');
            console.error('Solutions:');
            console.error('- Use a local web server (python -m http.server 8000)');
            console.error('- Check your Google Apps Script deployment settings');
            console.error('- Verify the web app URL is correct');
            console.error('- Make sure "Who has access" is set to "Anyone"');
        }
        
        throw error;
    }
}

// Newsletter form submission
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        this.reset();
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .feature, .client-logo');
    animateElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
});

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#e2e8f0';
        }
    });
    
    return isValid;
}

// Add form validation to quote form
quoteForm.addEventListener('submit', function(e) {
    if (!validateForm(this)) {
        e.preventDefault();
        showNotification('Please fill in all required fields.', 'error');
    }
});

// Add loading states to buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    return () => {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Enhanced quote form with loading state
quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm(this)) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    const submitButton = this.querySelector('button[type="submit"]');
    const resetLoading = addLoadingState(submitButton);
    
    // Simulate API call
    setTimeout(() => {
        resetLoading();
        showNotification('Quote request submitted successfully! We\'ll get back to you soon.', 'success');
        this.reset();
        closeQuoteModal();
    }, 2000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroGraphic = document.querySelector('.hero-graphic');
    const aboutGraphic = document.querySelector('.about-graphic');
    
    if (heroGraphic) {
        heroGraphic.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    if (aboutGraphic) {
        aboutGraphic.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});

// Counter animation for statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Initialize tooltips or additional features
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Error notification type
function showErrorNotification(message) {
    showNotification(message, 'error');
}

// Update notification styles to include error type
const updatedNotificationStyles = document.createElement('style');
updatedNotificationStyles.textContent = `
    .notification-error {
        background: #ef4444 !important;
    }
`;
document.head.appendChild(updatedNotificationStyles); 