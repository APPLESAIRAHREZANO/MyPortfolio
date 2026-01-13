// ===== NAVIGATION FUNCTIONALITY =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Handle navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Show corresponding section with animation
        const targetSection = link.getAttribute('data-section');
        const targetElement = document.getElementById(targetSection);
        targetElement.classList.add('active');
        
        // Scroll to top of section smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ===== THEME TOGGLE FUNCTIONALITY =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.textContent = '☀️';
}

// Toggle theme on click
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    const isDark = document.body.classList.contains('dark-theme');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Add pulse animation
    themeToggle.style.transform = 'scale(1.2)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 200);
});

// ===== TYPING ANIMATION =====
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const originalText = typingText.textContent;
    typingText.textContent = '';
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentText = originalText.substring(0, charIndex);
        typingText.textContent = currentText;
        
        if (!isDeleting && charIndex < originalText.length) {
            charIndex++;
            typingSpeed = 100;
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            typingSpeed = 50;
        } else if (charIndex === originalText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } else if (charIndex === 0) {
            isDeleting = false;
            typingSpeed = 500; // Pause before typing again
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing animation after page load
    setTimeout(typeEffect, 1000);
}

// ===== CTA BUTTONS FUNCTIONALITY =====
const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = btn.getAttribute('href').replace('#', '');
        
        // Find and click the corresponding nav link
        const navLink = document.querySelector(`[data-section="${targetSection}"]`);
        if (navLink) {
            navLink.click();
        }
    });
});

// ===== WORK CARDS FUNCTIONALITY =====
const workCards = document.querySelectorAll('.work-card');
const projectData = [
    {
        name: 'Modern Dashboard',
        description: 'A comprehensive analytics dashboard featuring real-time data visualization, customizable widgets, and interactive charts built with React and D3.js.',
        tech: ['React', 'D3.js', 'Node.js', 'MongoDB'],
        link: 'https://example.com/dashboard'
    },
    {
        name: 'Fitness Tracker',
        description: 'Mobile-first fitness application with workout tracking, progress analytics, and social features. Includes calorie counter and exercise library.',
        tech: ['React Native', 'Firebase', 'Redux'],
        link: 'https://example.com/fitness'
    },
    {
        name: 'Online Store',
        description: 'Full-featured e-commerce platform with product catalog, shopping cart, secure checkout, and order management system.',
        tech: ['Next.js', 'Stripe', 'PostgreSQL'],
        link: 'https://example.com/store'
    },
    {
        name: 'Startup Branding',
        description: 'Complete brand identity package including logo design, color palette, typography system, and brand guidelines for a tech startup.',
        tech: ['Figma', 'Illustrator', 'After Effects'],
        link: 'https://example.com/branding'
    }
];

workCards.forEach((card, index) => {
    const viewBtn = card.querySelector('.view-btn');
    if (viewBtn && projectData[index]) {
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showProjectModal(projectData[index]);
        });
    }
    
    // Add click effect to entire card
    card.addEventListener('click', () => {
        if (projectData[index]) {
            showProjectModal(projectData[index]);
        }
    });
});

// Project Modal
function showProjectModal(project) {
    // Create modal HTML
    const modalHTML = `
        <div class="project-modal" id="projectModal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>${project.name}</h2>
                <p class="modal-description">${project.description}</p>
                <div class="modal-tech">
                    <h4>Technologies Used:</h4>
                    <div class="tech-list">
                        ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-actions">
                    <a href="${project.link}" class="btn btn-primary" target="_blank">View Live Project</a>
                    <button class="btn btn-secondary modal-close-btn">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles if not exists
    if (!document.getElementById('modalStyles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modalStyles';
        modalStyles.textContent = `
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            .modal-content {
                position: relative;
                background: var(--card-bg);
                padding: 3rem;
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.3s ease;
            }
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: var(--text-light);
                transition: color 0.3s;
            }
            .modal-close:hover {
                color: var(--primary-color);
            }
            .modal-content h2 {
                color: var(--primary-color);
                margin-bottom: 1rem;
            }
            .modal-description {
                color: var(--text-light);
                line-height: 1.8;
                margin-bottom: 2rem;
            }
            .modal-tech h4 {
                color: var(--text-color);
                margin-bottom: 1rem;
            }
            .tech-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 2rem;
            }
            .tech-badge {
                padding: 0.5rem 1rem;
                background: var(--primary-color);
                color: white;
                border-radius: 20px;
                font-size: 0.9rem;
            }
            .modal-actions {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Close modal functionality
    const modal = document.getElementById('projectModal');
    const closeButtons = modal.querySelectorAll('.modal-close, .modal-close-btn, .modal-overlay');
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
    });
    
    // Add fadeOut animation
    if (!document.getElementById('fadeOutAnimation')) {
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.id = 'fadeOutAnimation';
        fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeOutStyle);
    }
}

// ===== TECH TAGS FUNCTIONALITY =====
const techTags = document.querySelectorAll('.tech-tag');
let selectedTags = new Set();

techTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const tagText = tag.textContent;
        
        if (selectedTags.has(tagText)) {
            selectedTags.delete(tagText);
            tag.style.background = 'var(--card-bg)';
            tag.style.color = 'var(--text-color)';
        } else {
            selectedTags.add(tagText);
            tag.style.background = 'var(--primary-color)';
            tag.style.color = 'white';
        }
        
        // Show selected tags count
        if (selectedTags.size > 0) {
            console.log(`Selected skills: ${Array.from(selectedTags).join(', ')}`);
        }
    });
    
    // Hover effect
    tag.addEventListener('mouseenter', () => {
        if (!selectedTags.has(tag.textContent)) {
            techTags.forEach(t => {
                if (t !== tag && !selectedTags.has(t.textContent)) {
                    t.style.opacity = '0.5';
                }
            });
        }
    });
    
    tag.addEventListener('mouseleave', () => {
        techTags.forEach(t => {
            t.style.opacity = '1';
        });
    });
});

// ===== CONTACT FORM FUNCTIONALITY =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showNotification('success', `Thank you, ${formData.name}! Your message has been sent successfully.`);
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Store in localStorage
                const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                messages.push(formData);
                localStorage.setItem('contactMessages', JSON.stringify(messages));
                
                console.log('Form submitted:', formData);
            }, 1500);
        } else {
            showNotification('error', 'Please fill in all fields correctly.');
        }
    });
}

// Field validation function
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email';
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = 'var(--accent-color)';
        showFieldError(field, errorMessage);
    } else {
        field.classList.remove('error');
        field.style.borderColor = 'var(--border-color)';
        removeFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    removeFieldError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--accent-color)';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.25rem';
    field.parentElement.appendChild(errorDiv);
}

function removeFieldError(field) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Notification system
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const notificationStyles = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1.5rem 2rem;
        background: ${type === 'success' ? 'var(--primary-color)' : 'var(--accent-color)'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    notification.style.cssText = notificationStyles;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
if (!document.getElementById('notificationStyles')) {
    const notifStyles = document.createElement('style');
    notifStyles.id = 'notificationStyles';
    notifStyles.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(notifStyles);
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for scroll animation
const animatedCards = document.querySelectorAll('.about-card, .work-card');
animatedCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ===== PARALLAX EFFECT =====
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const floatingCards = document.querySelectorAll('.floating-card');
            const scrolled = window.pageYOffset;
            
            floatingCards.forEach((card, index) => {
                const speed = 0.5 + (index * 0.1);
                card.style.transform = `translateY(${scrolled * speed * -0.1}px)`;
            });
            
            ticking = false;
        });
        ticking = true;
    }
});

// ===== INPUT ANIMATIONS =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// ===== SOCIAL LINKS =====
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.textContent;
        showNotification('success', `Opening ${platform}...`);
        
        // Simulate opening social media
        setTimeout(() => {
            console.log(`Would open ${platform} profile`);
        }, 500);
    });
    
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Navigate sections with arrow keys
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const currentActive = document.querySelector('.nav-link.active');
        const nextLink = currentActive.parentElement.nextElementSibling?.querySelector('.nav-link');
        if (nextLink) {
            nextLink.click();
        }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const currentActive = document.querySelector('.nav-link.active');
        const prevLink = currentActive.parentElement.previousElementSibling?.querySelector('.nav-link');
        if (prevLink) {
            prevLink.click();
        }
    }
    
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.querySelector('.modal-close').click();
        }
    }
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    console.log('✅ Portfolio loaded successfully!');
    console.log('💡 Tip: Use arrow keys to navigate between sections');
    console.log('💡 Press Escape to close modals');
    
    // Check stored messages
    const storedMessages = localStorage.getItem('contactMessages');
    if (storedMessages) {
        console.log(`📧 ${JSON.parse(storedMessages).length} contact messages stored`);
    }
});

console.log('🚀 Portfolio is fully functional!');