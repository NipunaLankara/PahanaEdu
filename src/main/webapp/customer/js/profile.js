// function showMessage() {
//     alert("Your profile update request has been submitted!");
//     return true; // allow the form to be submitted
// }

// Profile JavaScript - js/profile.js

document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
});

function initializeProfile() {
    // Initialize form validation
    initializeValidation();

    // Initialize progress tracking
    initializeProgress();

    // Initialize tooltips
    initializeTooltips();

    // Initialize form animations
    initializeAnimations();

    // Initialize keyboard shortcuts
    initializeKeyboardShortcuts();

    console.log('Profile page initialized successfully');
}

// Form Validation
function initializeValidation() {
    const form = document.getElementById('profileForm');
    const inputs = form.querySelectorAll('input, textarea');

    // Add real-time validation to each input
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
            updateProgress();
        });

        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('focus', function() {
            clearValidationMessage(this);
        });
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });

    // Initial validation check
    updateProgress();
}

function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    let isValid = true;
    let message = '';

    // Clear previous validation
    field.classList.remove('valid', 'invalid');

    if (!value && field.required) {
        isValid = false;
        message = `${getFieldLabel(fieldName)} is required`;
    } else if (value) {
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    message = 'Name must be at least 2 characters long';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    isValid = false;
                    message = 'Name can only contain letters and spaces';
                }
                break;

            case 'nic':
                if (!/^(\d{9}[vVxX]|\d{12})$/.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid NIC number (9 digits + V/X or 12 digits)';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
                break;

            case 'contact':
                if (!/^(\+94|0)?[1-9]\d{8}$/.test(value.replace(/\s+/g, ''))) {
                    isValid = false;
                    message = 'Please enter a valid Sri Lankan phone number';
                }
                break;

            case 'address':
                if (value.length < 10) {
                    isValid = false;
                    message = 'Address must be at least 10 characters long';
                }
                break;
        }
    }

    // Apply validation styles
    if (isValid && value) {
        field.classList.add('valid');
        showValidationMessage(field, 'Valid ✓', 'success');
    } else if (!isValid) {
        field.classList.add('invalid');
        showValidationMessage(field, message, 'error');
    }

    return isValid;
}

function getFieldLabel(fieldName) {
    const labels = {
        'name': 'Full Name',
        'nic': 'NIC Number',
        'email': 'Email Address',
        'contact': 'Contact Number',
        'address': 'Address'
    };
    return labels[fieldName] || fieldName;
}

function showValidationMessage(field, message, type) {
    const container = field.closest('.input-container');
    const messageElement = container.querySelector('.validation-message');

    messageElement.textContent = message;
    messageElement.className = `validation-message ${type} show`;
}

function clearValidationMessage(field) {
    const container = field.closest('.input-container');
    const messageElement = container.querySelector('.validation-message');

    messageElement.classList.remove('show');
}

// Progress Tracking
function initializeProgress() {
    updateProgress();
}

function updateProgress() {
    const form = document.getElementById('profileForm');
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    let completedFields = 0;
    let totalFields = requiredFields.length;

    requiredFields.forEach(field => {
        if (field.value.trim() && field.classList.contains('valid')) {
            completedFields++;
        } else if (field.value.trim() && !field.classList.contains('invalid')) {
            // Count as complete if has value and not invalid
            if (validateField(field)) {
                completedFields++;
            }
        }
    });

    const percentage = (completedFields / totalFields) * 100;

    progressFill.style.width = percentage + '%';
    progressText.textContent = `Complete your profile (${completedFields}/${totalFields})`;

    // Change color based on progress
    if (percentage === 100) {
        progressFill.style.background = 'linear-gradient(90deg, #27ae60, #2ecc71)';
        progressText.style.color = '#27ae60';
    } else if (percentage >= 75) {
        progressFill.style.background = 'linear-gradient(90deg, #f39c12, #e67e22)';
    } else {
        progressFill.style.background = 'linear-gradient(90deg, #667eea, #764ba2)';
    }
}

// Form Submission
function handleFormSubmission() {
    const form = document.getElementById('profileForm');
    const submitBtn = document.getElementById('submitBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Validate all fields
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let allValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            allValid = false;
        }
    });

    if (!allValid) {
        showMessage('Please fix the errors in the form before submitting.', 'error');
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    loadingOverlay.classList.add('show');

    // Add form data validation
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value.trim();
    });

    // Simulate API call delay (remove this in production)
    setTimeout(() => {
        // Actually submit the form
        form.submit();
    }, 1500);

    showMessage('Profile update in progress...', 'info');
}

// Tooltips
function initializeTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');

    tooltipTriggers.forEach(trigger => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = trigger.getAttribute('data-tooltip');

        const container = trigger.closest('.input-container');
        container.appendChild(tooltip);

        trigger.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
        });

        trigger.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });

        trigger.addEventListener('focus', () => {
            tooltip.style.opacity = '1';
        });

        trigger.addEventListener('blur', () => {
            tooltip.style.opacity = '0';
        });
    });
}

// Animations
function initializeAnimations() {
    // Animate form elements on load
    const animateElements = document.querySelectorAll('.form-group, .form-actions, .security-info');

    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';

        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });

    // Animate card header
    const cardHeader = document.querySelector('.card-header');
    if (cardHeader) {
        cardHeader.classList.add('fade-in');
    }
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + S to save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            handleFormSubmission();
        }

        // Escape to cancel
        if (e.key === 'Escape') {
            if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
                goBack();
            }
        }

        // Ctrl + R to reset (override browser refresh)
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            if (confirm('Are you sure you want to reset the form?')) {
                resetForm();
            }
        }
    });

    // Show keyboard shortcuts notification
    setTimeout(() => {
        showMessage('💡 Tip: Use Ctrl+S to save, Escape to cancel, Ctrl+R to reset!', 'info');
    }, 2000);
}

// Utility Functions
function showMessage(message, type = 'info') {
    const container = document.getElementById('messageContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        ${message}
        <button class="message-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(messageDiv);

    // Show message
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }
    }, 5000);
}

function goBack() {
    if (hasUnsavedChanges()) {
        if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
            window.history.back();
        }
    } else {
        window.history.back();
    }
}

function resetForm() {
    if (confirm('Are you sure you want to reset all fields to their original values?')) {
        const form = document.getElementById('profileForm');

        // Reset form
        form.reset();

        // Clear validation states
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
            clearValidationMessage(input);
        });

        // Reset progress
        updateProgress();

        showMessage('Form has been reset to original values.', 'info');
    }
}

function hasUnsavedChanges() {
    const form = document.getElementById('profileForm');
    const inputs = form.querySelectorAll('input, textarea');

    for (let input of inputs) {
        if (input.defaultValue !== input.value) {
            return true;
        }
    }
    return false;
}

// Format phone number as user types
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.startsWith('94')) {
        value = '+' + value;
    } else if (value.startsWith('0')) {
        // Keep as is
    } else if (value.length === 9) {
        value = '0' + value;
    }

    input.value = value;
}

// Auto-format NIC number
function formatNIC(input) {
    let value = input.value.toUpperCase();

    // Remove any invalid characters
    value = value.replace(/[^0-9VX]/g, '');

    input.value = value;
}

// Initialize auto-formatting
document.addEventListener('DOMContentLoaded', function() {
    const contactInput = document.getElementById('contact');
    const nicInput = document.getElementById('nic');

    if (contactInput) {
        contactInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }

    if (nicInput) {
        nicInput.addEventListener('input', function() {
            formatNIC(this);
        });
    }
});

// Performance monitoring
function trackUserInteraction(action, field) {
    console.log(`User interaction: ${action} on ${field}`);
    // Here you could send analytics data to your backend
}

// Add interaction tracking
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn')) {
        trackUserInteraction('button_click', e.target.textContent.trim());
    }
});

document.addEventListener('focus', function(e) {
    if (e.target.matches('input, textarea')) {
        trackUserInteraction('field_focus', e.target.name);
    }
}, true);

// Auto-save functionality (optional)
let autoSaveTimer;
function enableAutoSave() {
    const form = document.getElementById('profileForm');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                saveFormData();
            }, 2000); // Auto-save after 2 seconds of inactivity
        });
    });
}

function saveFormData() {
    const form = document.getElementById('profileForm');
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Save to session storage (note: this won't work in Claude artifacts)
    try {
        sessionStorage.setItem('profileFormData', JSON.stringify(data));
        console.log('Form data auto-saved');
    } catch (e) {
        console.log('Auto-save not available in this environment');
    }
}

function loadFormData() {
    try {
        const savedData = sessionStorage.getItem('profileFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = document.querySelector(`[name="${key}"]`);
                if (field && !field.value) {
                    field.value = data[key];
                }
            });
            console.log('Form data restored from auto-save');
        }
    } catch (e) {
        console.log('Auto-save restore not available in this environment');
    }
}

// Export functions for global use
window.showMessage = showMessage;
window.goBack = goBack;
window.resetForm = resetForm;
window.handleFormSubmission = handleFormSubmission;

console.log('Profile JavaScript loaded successfully');