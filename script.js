// ===== NAVIGATION FUNCTIONALITY =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active from all
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        // Add active to clicked
        link.classList.add('active');
        
        const targetSection = link.getAttribute('data-section');
        document.getElementById(targetSection).classList.add('active');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    const isDark = document.body.classList.contains('dark-theme');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    themeToggle.style.transform = 'scale(1.2)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 200);
});

// ===== TYPING ANIMATION =====
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = 'Building digital experiences that matter.';
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                typingText.textContent = '';
                i = 0;
                typeWriter();
            }, 3000);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// ===== CTA BUTTONS =====
const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.getAttribute('href').replace('#', '');
        const navLink = document.querySelector(`[data-section="${target}"]`);
        if (navLink) {
            navLink.click();
        }
    });
});

// ===== PROJECT CARDS =====
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
    card.addEventListener('click', () => {
        if (projectData[index]) {
            showProjectModal(projectData[index]);
        }
    });
});

function showProjectModal(project) {
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
                z-index: 10000;
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
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
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
                font-size: 2rem;
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
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
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
}

// ===== TECH TAGS =====
const techTags = document.querySelectorAll('.tech-tag');
let selectedTags = new Set();

techTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const tagText = tag.textContent;
        
        if (selectedTags.has(tagText)) {
            selectedTags.delete(tagText);
            tag.style.background = 'var(--card-bg)';
            tag.style.color = 'var(--text-color)';
            tag.style.borderColor = 'var(--border-color)';
        } else {
            selectedTags.add(tagText);
            tag.style.background = 'var(--primary-color)';
            tag.style.color = 'white';
            tag.style.borderColor = 'var(--primary-color)';
        }
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('success', `Thank you, ${formData.name}! Your message has been sent.`);
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push(formData);
            localStorage.setItem('contactMessages', JSON.stringify(messages));
        }, 1500);
    });
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = 'scale(1)';
        });
    });
}

function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const styles = `
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
    
    notification.style.cssText = styles;
    document.body.appendChild(notification);
    
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
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== SOCIAL LINKS =====
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.textContent;
        showNotification('success', `Opening ${platform}...`);
    });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

const cards = document.querySelectorAll('.about-card, .work-card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const current = document.querySelector('.nav-link.active');
        const next = current.parentElement.nextElementSibling?.querySelector('.nav-link');
        if (next) next.click();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const current = document.querySelector('.nav-link.active');
        const prev = current.parentElement.previousElementSibling?.querySelector('.nav-link');
        if (prev) prev.click();
    } else if (e.key === 'Escape') {
        const modal = document.getElementById('projectModal');
        if (modal) modal.querySelector('.modal-close').click();
    }
});

console.log('🚀 Portfolio loaded successfully!');
console.log('💡 Tip: Use arrow keys to navigate sections');