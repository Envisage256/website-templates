/**
 * Sterling & Associates Law Firm
 * Main JavaScript File
 * Vanilla ES6 JavaScript - No frameworks or libraries
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initMobileNavigation();
    initSmoothScrolling();
    initFormValidation();
    initFAQAccordion();
    initActiveNavLinks();
    initHeaderScroll();
});

/**
 * Mobile Navigation Toggle
 * Handles hamburger menu for mobile devices
 */
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (!navToggle || !mainNav) return;
    
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        
        // Prevent body scroll when nav is open
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        
        // Update aria-expanded attribute
        const isExpanded = mainNav.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close nav when clicking on a link
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close nav when clicking outside
    document.addEventListener('click', function(event) {
        if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) {
            navToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Smooth Scrolling
 * Enables smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Validation
 * Handles client-side form validation
 */
function initFormValidation() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Consultation Form
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', handleConsultationFormSubmit);
    }
}

/**
 * Contact Form Submit Handler
 */
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    // Clear previous errors
    clearFormErrors(this);
    
    let isValid = true;
    
    // Validate Name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
        showError(name, 'nameError', 'Please enter your full name.');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'nameError', 'Name must be at least 2 characters.');
        isValid = false;
    }
    
    // Validate Email
    const email = document.getElementById('email');
    if (!email.value.trim()) {
        showError(email, 'emailError', 'Please enter your email address.');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'emailError', 'Please enter a valid email address.');
        isValid = false;
    }
    
    // Validate Phone (optional, but validate format if provided)
    const phone = document.getElementById('phone');
    if (phone.value.trim() && !isValidPhone(phone.value)) {
        showError(phone, 'phoneError', 'Please enter a valid phone number.');
        isValid = false;
    }
    
    // Validate Subject
    const subject = document.getElementById('subject');
    if (!subject.value) {
        showError(subject, 'subjectError', 'Please select a subject.');
        isValid = false;
    }
    
    // Validate Message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        showError(message, 'messageError', 'Please enter your message.');
        isValid = false;
    } else if (message.value.trim().length < 20) {
        showError(message, 'messageError', 'Message must be at least 20 characters.');
        isValid = false;
    }
    
    // Validate Privacy Checkbox
    const privacy = document.getElementById('privacy');
    if (!privacy.checked) {
        showError(privacy, 'privacyError', 'You must acknowledge this statement to proceed.');
        isValid = false;
    }
    
    if (isValid) {
        // Hide form, show success message
        this.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        
        // In a real application, you would submit the form data here
        console.log('Contact form submitted successfully');
    }
}

/**
 * Consultation Form Submit Handler
 */
function handleConsultationFormSubmit(event) {
    event.preventDefault();
    
    // Clear previous errors
    clearFormErrors(this);
    
    let isValid = true;
    
    // Validate First Name
    const firstName = document.getElementById('firstName');
    if (!firstName.value.trim()) {
        showError(firstName, 'firstNameError', 'Please enter your first name.');
        isValid = false;
    }
    
    // Validate Last Name
    const lastName = document.getElementById('lastName');
    if (!lastName.value.trim()) {
        showError(lastName, 'lastNameError', 'Please enter your last name.');
        isValid = false;
    }
    
    // Validate Email
    const email = document.getElementById('consultEmail');
    if (!email.value.trim()) {
        showError(email, 'consultEmailError', 'Please enter your email address.');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'consultEmailError', 'Please enter a valid email address.');
        isValid = false;
    }
    
    // Validate Phone
    const phone = document.getElementById('consultPhone');
    if (!phone.value.trim()) {
        showError(phone, 'consultPhoneError', 'Please enter your phone number.');
        isValid = false;
    } else if (!isValidPhone(phone.value)) {
        showError(phone, 'consultPhoneError', 'Please enter a valid phone number.');
        isValid = false;
    }
    
    // Validate Practice Area
    const practiceArea = document.getElementById('practiceArea');
    if (!practiceArea.value) {
        showError(practiceArea, 'practiceAreaError', 'Please select a practice area.');
        isValid = false;
    }
    
    // Validate Preferred Date
    const preferredDate = document.getElementById('preferredDate');
    if (!preferredDate.value) {
        showError(preferredDate, 'preferredDateError', 'Please select a preferred date.');
        isValid = false;
    } else {
        // Check if date is in the future
        const selectedDate = new Date(preferredDate.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showError(preferredDate, 'preferredDateError', 'Please select a future date.');
            isValid = false;
        }
    }
    
    // Validate Preferred Time
    const preferredTime = document.getElementById('preferredTime');
    if (!preferredTime.value) {
        showError(preferredTime, 'preferredTimeError', 'Please select a preferred time.');
        isValid = false;
    }
    
    // Validate Consultation Type
    const consultType = document.getElementById('consultType');
    if (!consultType.value) {
        showError(consultType, 'consultTypeError', 'Please select a consultation type.');
        isValid = false;
    }
    
    // Validate Case Description
    const caseDescription = document.getElementById('caseDescription');
    if (!caseDescription.value.trim()) {
        showError(caseDescription, 'caseDescriptionError', 'Please describe your legal matter.');
        isValid = false;
    } else if (caseDescription.value.trim().length < 30) {
        showError(caseDescription, 'caseDescriptionError', 'Please provide more details (at least 30 characters).');
        isValid = false;
    }
    
    // Validate Privacy Checkbox
    const privacy = document.getElementById('consultPrivacy');
    if (!privacy.checked) {
        showError(privacy, 'consultPrivacyError', 'You must acknowledge this statement to proceed.');
        isValid = false;
    }
    
    if (isValid) {
        // Hide form, show success message
        this.style.display = 'none';
        document.getElementById('consultFormSuccess').style.display = 'block';
        
        // Scroll to success message
        document.getElementById('consultFormSuccess').scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // In a real application, you would submit the form data here
        console.log('Consultation form submitted successfully');
    }
}

/**
 * Show form error
 */
function showError(input, errorId, message) {
    input.classList.add('error');
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Clear all form errors
 */
function clearFormErrors(form) {
    const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
    inputs.forEach(function(input) {
        input.classList.remove('error');
    });
    
    const errors = form.querySelectorAll('.form-error');
    errors.forEach(function(error) {
        error.textContent = '';
    });
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone format
 */
function isValidPhone(phone) {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    // Valid if 10 or 11 digits (with country code)
    return digits.length >= 10 && digits.length <= 15;
}

/**
 * FAQ Accordion
 * Handles expand/collapse of FAQ items
 */
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-item.active').forEach(function(item) {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current FAQ
            faqItem.classList.toggle('active');
            this.setAttribute('aria-expanded', !isActive);
        });
    });
}

/**
 * Active Navigation Links
 * Highlights current page in navigation
 */
function initActiveNavLinks() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        
        // Check if this link matches the current page
        if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
            // Remove active class from all links first
            navLinks.forEach(function(l) {
                l.classList.remove('active');
            });
            link.classList.add('active');
        }
    });
}

/**
 * Header Scroll Effect
 * Adds shadow to header on scroll
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class for styling
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Set minimum date for date inputs
 * Prevents selecting past dates
 */
(function() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(function(input) {
        input.setAttribute('min', today);
    });
})();
