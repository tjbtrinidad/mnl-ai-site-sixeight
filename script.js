    });
    
    // CTA Section Interactions
    const mainContactForm = document.getElementById('main-contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const urgencyBtn = document.querySelector('.urgency-btn');
    const spotsLeftCounter = document.getElementById('spots-left');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    const altMethods = document.querySelectorAll('.alt-method');
    
    // Dynamic Spots Counter
    let spotsLeft = 47;
    setInterval(() => {
        if (Math.random() < 0.1 && spotsLeft > 30) { // 10% chance every interval, minimum 30 spots
            spotsLeft--;
            if (spotsLeftCounter) {
                spotsLeftCounter.textContent = spotsLeft;
                
                // Flash effect when number changes
                spotsLeftCounter.style.color = '#FF6B35';
                spotsLeftCounter.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    spotsLeftCounter.style.color = '#FF6B35';
                    spotsLeftCounter.style.transform = 'scale(1)';
                }, 300);
            }
        }
    }, 30000); // Check every 30 seconds
    
    // Form Input Enhanced Effects
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(-3px)';
                formGroup.style.boxShadow = '0 5px 15px rgba(0, 224, 198, 0.1)';
            }
        });
        
        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(0)';
                formGroup.style.boxShadow = 'none';
            }
        });
        
        // Real-time validation feedback
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                input.style.background = 'rgba(16, 185, 129, 0.05)';
            } else {
                input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                input.style.background = 'rgba(255, 255, 255, 0.05)';
            }
        });
    });
    
    // Main Contact Form Submission
    if (mainContactForm) {
        mainContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(mainContactForm);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                businessType: formData.get('businessType'),
                monthlyRevenue: formData.get('monthlyRevenue'),
                biggestChallenge: formData.get('biggestChallenge'),
                urgentHelp: formData.get('urgentHelp') === 'on'
            };
            
            // Enhanced validation
            const errors = [];
            if (!data.firstName) errors.push('First name is required');
            if (!data.lastName) errors.push('Last name is required');
            if (!data.email) errors.push('Email is required');
            if (!data.phone) errors.push('Phone number is required');
            if (!data.businessType) errors.push('Business type is required');
            if (!data.monthlyRevenue) errors.push('Revenue range is required');
            if (!data.biggestChallenge || data.biggestChallenge.length < 10) {
                errors.push('Please describe your challenge (at least 10 characters)');
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (data.email && !emailRegex.test(data.email)) {
                errors.push('Please enter a valid email address');
            }
            
            if (errors.length > 0) {
                showNotification(errors[0], 'error');
                return;
            }
            
            // EPIC Submit Animation
            const originalContent = submitBtn.innerHTML;
            
            // Stage 1: Loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span class="btn-text">Securing Your Spot...</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)';
            submitBtn.disabled = true;
            
            // Create explosion effect
            for (let i = 0; i < 25; i++) {
                const spark = document.createElement('div');
                const angle = (i * 14.4) * (Math.PI / 180);
                const distance = 200 + Math.random() * 100;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                spark.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: linear-gradient(45deg, #00E0C6, #FFCE52);
                    border-radius: 50%;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    animation: form-spark-explosion 2s ease-out forwards;
                    animation-delay: ${i * 0.02}s;
                    pointer-events: none;
                    box-shadow: 0 0 15px rgba(0, 224, 198, 0.8);
                `;
                
                spark.style.setProperty('--end-x', `${x}px`);
                spark.style.setProperty('--end-y', `${y}px`);
                
                submitBtn.appendChild(spark);
                
                setTimeout(() => {
                    if (spark.parentNode) {
                        spark.remove();
                    }
                }, 2000);
            }
            
            setTimeout(() => {
                // Stage 2: Processing
                submitBtn.innerHTML = '<i class="fas fa-cog fa-spin"></i><span class="btn-text">Processing Your Info...</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #FFCE52 0%, #FFD700 100%)';
                
                setTimeout(() => {
                    // Stage 3: Success
                    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i><span class="btn-text">SUCCESS! Check Your Email</span>';
                    submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #34D399 100%)';
                    
                    // Show success message
                    showNotification('🎉 Your FREE strategy call is booked! Check your email for next steps.', 'success');
                    
                    // Reset form
                    mainContactForm.reset();
                    formInputs.forEach(input => {
                        input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        input.style.background = 'rgba(255, 255, 255, 0.05)';
                    });
                    
                    // Track conversion
                    console.log('MAIN FORM SUBMITTED - MAJOR CONVERSION!', data);
                    
                    // Decrease spots counter
                    if (spotsLeft > 30) {
                        spotsLeft--;
                        if (spotsLeftCounter) {
                            spotsLeftCounter.textContent = spotsLeft;
                        }
                    }
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalContent;
                        submitBtn.style.background = 'linear-gradient(135deg, var(--accent-teal) 0%, var(--accent-teal-bright) 100%)';
                        submitBtn.disabled = false;
                    }, 5000);
                    
                }, 2000);
            }, 1500);
        });
    }
    
    // Alternative Contact Methods
    altMethods.forEach(method => {
        method.addEventListener('click', function(e) {
            const methodType = this.classList.contains('messenger') ? 'Messenger' : 
                              this.classList.contains('whatsapp') ? 'WhatsApp' : 'Phone';
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            console.log(`Alternative contact clicked: ${methodType}`);
            
            // Don't prevent default for actual links
        });
    });
    
    // Urgency Button Effect
    if (urgencyBtn) {
        urgencyBtn.addEventListener('click', function() {
            // Create upward shooting stars
            for (let i = 0; i < 15; i++) {
                const star = document.createElement('div');
                const randomX = (Math.random() - 0.5) * 200;
                
                star.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #FFCE52;
                    border-radius: 50%;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    animation: urgency-star-shoot 1.5s ease-out forwards;
                    animation-delay: ${i * 0.1}s;
                    pointer-events: none;
                    box-shadow: 0 0 10px rgba(255, 206, 82, 0.8);
                `;
                
                star.style.setProperty('--end-x', `${randomX}px`);
                star.style.setProperty('--end-y', '-200px');
                
                this.appendChild(star);
                
                setTimeout(() => {
                    if (star.parentNode) {
                        star.remove();
                    }
                }, 1500);
            }
            
            console.log('Urgency button clicked - scroll to form');
        });
    }
    
    // Benefit Items Stagger Animation
    const benefitItems = document.querySelectorAll('.benefit-item');
    const benefitObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                benefitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    benefitItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.6, 1)';
        benefitObserver.observe(item);
    });
    
    // Form Container Glow Effect
    const formContainer = document.querySelector('.cta-form-container');
    if (formContainer) {
        const formObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add pulsing glow
                    setInterval(() => {
                        const intensity = 0.3 + Math.random() * 0.4;
                        formContainer.style.boxShadow = `0 0 ${40 + intensity * 40}px rgba(0, 224, 198, ${intensity})`;
                    }, 500);
                    formObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        formObserver.observe(formContainer);
    }
    
    // Social Proof Animation
    const avatarStack = document.querySelector('.avatar-stack');
    if (avatarStack) {
        const avatars = avatarStack.querySelectorAll('.avatar');
        
        setInterval(() => {
            avatars.forEach((avatar, index) => {
                setTimeout(() => {
                    avatar.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        avatar.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            });
        }, 5000);
    }
    
    // Final Urgency Card Animation
    const urgencyCard = document.querySelector('.urgency-card');
    if (urgencyCard) {
        const urgencyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Dramatic entrance
                    entry.target.style.animation = 'urgency-dramatic-entrance 1s ease-out';
                    urgencyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        urgencyObserver.observe(urgencyCard);
    }
});

// Add CTA-specific animation styles
const ctaAnimationStyles = document.createElement('style');
ctaAnimationStyles.textContent = `
    @keyframes form-spark-explosion {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes urgency-star-shoot {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes urgency-dramatic-entrance {
        0% {
            transform: scale(0.8) translateY(50px);
            opacity: 0;
        }
        50% {
            transform: scale(1.05) translateY(-10px);
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
    }
    
    .form-submit-btn:hover {
        animation: submit-btn-bounce 0.6s ease-in-out infinite;
    }
    
    @keyframes submit-btn-bounce {
        0%, 100% { transform: translateY(-3px) scale(1.02); }
        50% { transform: translateY(-5px) scale(1.05); }
    }
    
    .benefit-item:hover .benefit-icon {
        animation: benefit-icon-spin 0.8s ease-in-out;
    }
    
    @keyframes benefit-icon-spin {
        0% { transform: rotateY(0deg) scale(1); }
        50% { transform: rotateY(180deg) scale(1.2); }
        100% { transform: rotateY(360deg) scale(1); }
    }
    
    .alt-method:hover .alt-icon {
        animation: alt-icon-bounce 0.5s ease-in-out;
    }
    
    @keyframes alt-icon-bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
`;
document.head.appendChild(ctaAnimationStyles);

// Initialize optimizations
preloadResources();// Company Stat Animation
function animateCompanyStat(element) {
    const text = element.textContent;
    let finalValue, suffix = '';
    
    if (text.includes('₱')) {
        const match = text.match(/₱(\d+)([MK]?)/);
        if (match) {
            finalValue = parseInt(match[1]);
            suffix = '₱' + finalValue + (match[2] || '') + '+';
        }
    } else if (text.includes('%')) {
        finalValue = parseInt(text);
        suffix = '%';
    } else if (text.includes('+')) {
        finalValue = parseInt(text.replace(/\D/g, ''));
        suffix = '+';
    } else if (text.includes('K')) {
        finalValue = parseInt(text.replace(/\D/g, ''));
        suffix = 'K+';
    } else if (text.includes('/')) {
        element.textContent = text;
        return;
    } else if (text.includes('x')) {
        finalValue = parseInt(text);
        suffix = 'x';
    } else {
        finalValue = parseInt(text.replace(/\D/g, ''));
    }
    
    if (isNaN(finalValue)) return;
    
    const duration = 3500; // Longer for company stats
    const steps = 120;
    let currentStep = 0;
    
    const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        // Epic easing with bounce
        let easeOut;
        if (progress < 0.7) {
            easeOut = 1 - Math.pow(1 - progress / 0.7, 4);
        } else {
            const bounceProgress = (progress - 0.7) / 0.3;
            easeOut = 1 + Math.sin(bounceProgress * Math.PI * 6) * 0.15 * (1 - bounceProgress);
        }
        
        const currentValue = Math.floor(finalValue * Math.min(easeOut, 1));
        
        if (text.includes('₱')) {
            element.textContent = suffix.replace(finalValue.toString(), currentValue.toString());
        } else {
            element.textContent = currentValue + suffix;
        }
        
        // Epic glow effect during animation
        const glowIntensity = 40 + progress * 80;
        const glowOpacity = 0.4 + progress * 0.6;
        element.style.textShadow = `
            0 0 ${glowIntensity}px rgba(0, 224, 198, ${glowOpacity}),
            0 0 ${glowIntensity * 1.5}px rgba(0, 224, 198, ${glowOpacity * 0.5})
        `;
        
        if (currentStep >= steps) {
            clearInterval(timer);
            element.textContent = text;
            // Final epic glow
            element.style.textShadow = `
                0 0 60px rgba(0, 224, 198, 0.8),
                0 0 120px rgba(0, 224, 198, 0.4)
            `;
        }
    }, duration / steps);
}

// Add advanced about animations
const aboutAnimationStyles = document.createElement('style');
aboutAnimationStyles.textContent = `
    @keyframes founder-ripple {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes vision-spark-explosion {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes stat-icon-dance {
        0%, 100% { transform: scale(1) rotateY(0deg); }
        25% { transform: scale(1.1) rotateY(90deg); }
        50% { transform: scale(1.2) rotateY(180deg); }
        75% { transform: scale(1.1) rotateY(270deg); }
    }
    
    @keyframes pulse-ring {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(5);
            opacity: 0;
        }
    }
    
    .value-card:hover {
        box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 60px rgba(0, 224, 198, 0.2),
            inset 0 0 20px rgba(0, 224, 198, 0.1);
    }
    
    .stat-card:hover .stat-number {
        animation: number-glow 0.6s ease-in-out;
    }
    
    @keyframes number-glow {
        0%, 100% { 
            transform: scale(1);
            text-shadow: 0 0 30px rgba(0, 224, 198, 0.5);
        }
        50% { 
            transform: scale(1.15);
            text-shadow: 0 0 60px rgba(0, 224, 198, 0.8);
        }
    }
    
    .founder-story-card:hover::before {
        animation: rainbow-shimmer 2s ease-in-out infinite;
    }
    
    @keyframes rainbow-shimmer {
        0% { background: linear-gradient(90deg, var(--accent-teal), var(--accent-yellow), var(--accent-teal)); }
        50% { background: linear-gradient(90deg, var(--accent-yellow), var(--accent-teal), var(--accent-yellow)); }
        100% { background: linear-gradient(90deg, var(--accent-teal), var(--accent-yellow), var(--accent-teal)); }
    }
`;
document.head.appendChild(aboutAnimationStyles);

// Initialize optimizations
preloadResources();// Case Study Metric Animation
function animateCaseStudyMetric(element) {
    const text = element.textContent;
    let finalValue, suffix = '';
    
    if (text.includes('₱')) {
        finalValue = parseFloat(text.replace(/[₱,MK]/g, ''));
        suffix = text.includes('M') ? 'M' : text.includes('K') ? 'K' : '';
        suffix = '₱' + finalValue + suffix;
    } else if (text.includes('%')) {
        finalValue = parseInt(text);
        suffix = '%';
    } else if (text.includes('x')) {
        finalValue = parseInt(text);
        suffix = 'x';
    } else if (text.includes('/')) {
        element.textContent = text;
        return;
    } else {
        finalValue = parseInt(text.replace(/\D/g, ''));
    }
    
    if (isNaN(finalValue)) return;
    
    const duration = 2500;
    const steps = 80;
    let currentStep = 0;
    
    const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        // Dramatic easing effect
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(finalValue * easeOut);
        
        if (text.includes('₱')) {
            element.textContent = `₱${currentValue}${suffix.replace('₱' + finalValue, '')}`;
        } else {
            element.textContent = currentValue + suffix;
        }
        
        // Add glow effect during animation
        element.style.textShadow = `0 0 ${20 + progress * 30}px rgba(0, 224, 198, ${0.5 + progress * 0.3})`;
        
        if (currentStep >= steps) {
            clearInterval(timer);
            if (text.includes('₱')) {
                element.textContent = text;
            } else {
                element.textContent = finalValue + suffix;
            }
        }
    }, duration / steps);
}

// Big Stats Animation
function animateBigStat(element) {
    const text = element.textContent;
    let finalValue, suffix = '';
    
    if (text.includes('₱')) {
        const match = text.match(/₱(\d+)([MK]?)/);
        if (match) {
            finalValue = parseInt(match[1]);
            suffix = '₱' + finalValue + (match[2] || '') + '+';
        }
    } else if (text.includes('%')) {
        finalValue = parseInt(text);
        suffix = '%';
    } else if (text.includes('+')) {
        finalValue = parseInt(text.replace(/\D/g, ''));
        suffix = '+';
    } else if (text.includes('K')) {
        finalValue = parseInt(text.replace(/\D/g, ''));
        suffix = 'K+';
    } else {
        finalValue = parseInt(text.replace(/\D/g, ''));
    }
    
    if (isNaN(finalValue)) return;
    
    const duration = 3000;
    const steps = 100;
    let currentStep = 0;
    
    const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        // Smooth easing with bounce at end
        let easeOut;
        if (progress < 0.8) {
            easeOut = 1 - Math.pow(1 - progress / 0.8, 3);
        } else {
            const bounceProgress = (progress - 0.8) / 0.2;
            easeOut = 1 + Math.sin(bounceProgress * Math.PI * 4) * 0.1 * (1 - bounceProgress);
        }
        
        const currentValue = Math.floor(finalValue * Math.min(easeOut, 1));
        
        if (text.includes('₱')) {
            element.textContent = suffix.replace(finalValue.toString(), currentValue.toString());
        } else {
            element.textContent = currentValue + suffix;
        }
        
        // Intense glow effect
        element.style.textShadow = `
            0 0 ${30 + progress * 50}px rgba(0, 224, 198, ${0.6 + progress * 0.4}),
            0 0 ${60 + progress * 40}px rgba(0, 224, 198, ${0.3 + progress * 0.2})
        `;
        
        if (currentStep >= steps) {
            clearInterval(timer);
            element.textContent = text;
        }
    }, duration / steps);
}

// Typewriter Effect for Testimonials
function typeWriterEffect(element, text, speed = 50) {
    let i = 0;
    element.style.borderRight = '2px solid #00E0C6';
    
    const timer = setInterval(() => {
        element.textContent = text.substring(0, i);
        i++;
        
        if (i > text.length) {
            clearInterval(timer);
            element.style.borderRight = 'none';
        }
    }, speed);
}

// Add advanced animation styles
const advancedStyles = document.createElement('style');
advancedStyles.textContent = `
    @keyframes electric-flash {
        0% { opacity: 0; transform: translateX(-100%); }
        50% { opacity: 1; }
        100% { opacity: 0; transform: translateX(100%); }
    }
    
    @keyframes spark-explosion {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes mega-ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    .case-study-card:hover .industry-icon {
        animation: icon-bounce 0.6s ease-in-out;
    }
    
    @keyframes icon-bounce {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-5deg); }
        75% { transform: scale(1.1) rotate(5deg); }
    }
    
    .result-metric:hover .metric-icon {
        animation: metric-spin 0.8s ease-in-out;
    }
    
    @keyframes metric-spin {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(180deg) scale(1.2); }
        100% { transform: rotateY(360deg); }
    }
`;
document.head.appendChild(advancedStyles);

// Initialize optimizations
preloadResources();});

// Enhanced service stat animation
function animateServiceStat(element) {
    const text = element.textContent;
    let finalValue, suffix = '';
    
    // Extract number and suffix
    if (text.includes('%')) {
        finalValue = parseInt(text);
        suffix = '%';
    } else if (text.includes('x')) {
        finalValue = parseInt(text);
        suffix = 'x';
    } else if (text.includes('s')) {
        finalValue = parseInt(text);
        suffix = 's';
    } else {
        finalValue = parseInt(text.replace(/\D/g, ''));
        if (text.includes('/')) {
            element.textContent = text; // Keep "24/7" unchanged
            return;
        }
    }
    
    if (isNaN(finalValue)) return;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = finalValue / steps;
    let currentValue = 0;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        currentValue = Math.min(stepValue * step, finalValue);
        
        // Add easing effect
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const displayValue = Math.floor(finalValue * easeOut);
        
        element.textContent = displayValue + suffix;
        
        if (step >= steps) {
            clearInterval(timer);
            element.textContent = finalValue + suffix;
        }
    }, duration / steps);
}

// Initialize optimizations
preloadResources();// MNL-AI Hero Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navToggle.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                // Reset hamburger bars
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }
    
    // Enhanced Navbar Scroll Effect
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(18, 26, 47, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(0, 224, 198, 0.2)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(18, 26, 47, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(0, 224, 198, 0.1)';
            navbar.style.boxShadow = 'none';
        }
        
        // Hide navbar on scroll down, show on scroll up (only after 200px)
        if (currentScrollY > 200) {
            if (currentScrollY > lastScrollY) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth scrolling for anchor links
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
    
    // CTA Button Interactions
    const mainCTA = document.getElementById('main-cta');
    if (mainCTA) {
        mainCTA.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Placeholder for actual CTA action
            console.log('Main CTA clicked - redirect to contact form or booking');
            // window.location.href = '#contact';
        });
    }
    
    // Floating Elements Enhanced Animation
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        // Add hover effects
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05) translateY(-10px)';
            element.style.boxShadow = '0 20px 40px rgba(0, 224, 198, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1) translateY(0)';
            element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        // Add random micro-movements
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 10;
            const randomY = (Math.random() - 0.5) * 10;
            element.style.transform += ` translate(${randomX}px, ${randomY}px)`;
            
            setTimeout(() => {
                element.style.transform = element.style.transform.replace(/ translate\([^)]+\)/g, '');
            }, 2000);
        }, 5000 + index * 1000);
    });
    
    // Stats Counter Animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Hero Visual Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        const heroContent = document.querySelector('.hero-content');
        
        if (heroVisual && scrolled < window.innerHeight) {
            // Subtle parallax for visual elements
            heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
            
            // Counter parallax for content (optional)
            // heroContent.style.transform = `translateY(${scrolled * -0.1}px)`;
        }
    });
    
    // Glow Text Enhanced Effect
    const glowText = document.querySelector('.glow-text');
    if (glowText) {
        let glowIntensity = 0;
        let increasing = true;
        
        setInterval(() => {
            if (increasing) {
                glowIntensity += 0.1;
                if (glowIntensity >= 1) increasing = false;
            } else {
                glowIntensity -= 0.1;
                if (glowIntensity <= 0) increasing = true;
            }
            
            const glowStrength = 30 + (glowIntensity * 50);
            glowText.style.textShadow = `0 0 ${glowStrength}px rgba(0, 224, 198, ${0.3 + glowIntensity * 0.4})`;
        }, 100);
    }
    
    // Centerpiece Interactive Effects
    const centerpiece = document.querySelector('.centerpiece-core');
    if (centerpiece) {
        centerpiece.addEventListener('mouseenter', () => {
            centerpiece.style.animation = 'none';
            centerpiece.style.transform = 'translate(-50%, -50%) scale(1.2)';
            centerpiece.style.boxShadow = '0 0 100px rgba(0, 224, 198, 0.6)';
            
            // Add rotation to rings on hover
            document.querySelectorAll('.centerpiece-ring').forEach((ring, index) => {
                ring.style.animationDuration = `${5 + index * 2}s`;
            });
        });
        
        centerpiece.addEventListener('mouseleave', () => {
            centerpiece.style.animation = 'pulse-glow 3s ease-in-out infinite';
            centerpiece.style.transform = 'translate(-50%, -50%) scale(1)';
            centerpiece.style.boxShadow = '0 0 50px rgba(0, 224, 198, 0.5)';
            
            // Reset ring speeds
            document.querySelectorAll('.centerpiece-ring').forEach((ring, index) => {
                ring.style.animationDuration = `${20 - index * 5}s`;
            });
        });
    }
    
    // Page Load Animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Animate hero elements on load
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-cta, .hero-stats');
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.6, 1)';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + index * 150);
        });
    });
    
    // Mouse Trail Effect (Optional Enhancement)
    let mouseTrail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (mouseTrail.length > maxTrailLength) {
            mouseTrail.shift();
        }
        
        // Create subtle trail particles (only on hero section)
        const heroSection = document.querySelector('.hero');
        const rect = heroSection.getBoundingClientRect();
        
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
            createTrailParticle(e.clientX, e.clientY);
        }
    });
    
    // Performance optimization: Debounce scroll events
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
    
    // Apply debouncing to scroll events for better performance
    const debouncedScroll = debounce(() => {
        // Additional scroll-based animations can be added here
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
});

// Utility Functions

// Counter animation function
function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const step = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        
        // Format based on original text
        if (text.includes('+')) {
            element.textContent = displayValue + '+';
        } else if (text.includes('x')) {
            element.textContent = displayValue + 'x';
        } else if (text.includes('/')) {
            element.textContent = text; // Keep "24/7" unchanged
            clearInterval(timer);
        } else {
            element.textContent = displayValue;
        }
    }, 16);
}

// Trail particle creation
function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: rgba(0, 224, 198, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: particleFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1000);
}

// Add particle animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes particleFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Preload critical resources for better performance
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        link.onload = function() {
            this.onload = null;
            this.rel = 'stylesheet';
        };
        document.head.appendChild(link);
    });
}

    // Services Section Interactions
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceCTAs = document.querySelectorAll('.service-cta');
    const mainCTAButton = document.querySelector('.cta-button');
    
    // Service Cards Hover Effects
    serviceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Add stagger effect to other cards
            serviceCards.forEach((otherCard, otherIndex) => {
                if (otherIndex !== index) {
                    otherCard.style.transform = 'translateY(5px) scale(0.98)';
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset all cards
            serviceCards.forEach(otherCard => {
                otherCard.style.transform = 'translateY(0) scale(1)';
                otherCard.style.opacity = '1';
            });
        });
        
        // Add click ripple effect to service CTAs
        const cta = card.querySelector('.service-cta');
        if (cta) {
            cta.addEventListener('click', function(e) {
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
                    background: rgba(0, 224, 198, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Service-specific actions
                const serviceTitle = card.querySelector('.service-title').textContent;
                console.log(`Service CTA clicked: ${serviceTitle}`);
            });
        }
    });
    
    // Main CTA Button Enhanced Effects
    if (mainCTAButton) {
        mainCTAButton.addEventListener('click', function(e) {
            // Ripple effect
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
                background: rgba(18, 26, 47, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            console.log('Complete Package CTA clicked');
        });
        
        // Pulse effect on scroll into view
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    mainCTAButton.style.animation = 'pulse-glow 2s ease-in-out 3';
                    setTimeout(() => {
                        mainCTAButton.style.animation = '';
                    }, 6000);
                }
            });
        }, { threshold: 0.5 });
        
        ctaObserver.observe(mainCTAButton);
    }
    
    // Service Stats Counter Animation
    const serviceStats = document.querySelectorAll('.stat-value');
    const serviceStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateServiceStat(entry.target);
                serviceStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    serviceStats.forEach(stat => {
        serviceStatsObserver.observe(stat);
    });
    
    // Service Cards Scroll Animation
    const serviceCardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                serviceCardsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Initialize service cards for animation
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.6, 1)';
        serviceCardsObserver.observe(card);
    });

// Enhanced service stat animation
function animateServiceStat(element) {
    const text = element.textContent;
    let finalValue, suffix = '';
    
    // Extract number and suffix
    if (text.includes('%')) {
        finalValue = parseInt(text);
        suffix = '%';
    } else if (text.includes('x')) {
        finalValue = parseInt(text);
        suffix = 'x';
    } else if (text.includes('s')) {
        finalValue = parseInt(text);
        suffix = 's';
    } else {
        finalValue = parseInt(text.replace(/\D/g, ''));
        if (text.includes('/')) {
            element.textContent = text; // Keep "24/7" unchanged
            return;
        }
    }
    
    if (isNaN(finalValue)) return;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = finalValue / steps;
    let currentValue = 0;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        currentValue = Math.min(stepValue * step, finalValue);
        
        // Add easing effect
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const displayValue = Math.floor(finalValue * easeOut);
        
        element.textContent = displayValue + suffix;
        
        if (step >= steps) {
            clearInterval(timer);
            element.textContent = finalValue + suffix;
        }
    }, duration / steps);
}