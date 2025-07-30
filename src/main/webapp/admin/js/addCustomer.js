// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});

// Initialize form functionality
function initializeForm() {
    const form = document.getElementById('customerForm');
    const inputs = form.querySelectorAll('input');

    // Add event listeners to all inputs
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });

    // Special listeners for password fields
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');

    passwordField.addEventListener('input', checkPasswordStrength);
    confirmPasswordField.addEventListener('input', validatePasswordMatch);

    // Form submission handler
    form.addEventListener('submit', handleFormSubmission);

    // Auto-hide messages after 5 seconds
    setTimeout(hideMessages, 5000);
}

// Toggle password visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const button = field.nextElementSibling;
    const icon = button.querySelector('i');

    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Validate individual fields
function validateField(input) {
    const fieldName = input.name;
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters long';
                isValid = false;
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                errorMessage = 'Name should only contain letters and spaces';
                isValid = false;
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;

        // case 'nic':
        //     // Sri Lankan NIC validation (both old and new formats)
        //     const nicRegex = /^(?:\d{9}[vVxX]|\d{12})$/;
        //     if (!nicRegex.test(value)) {
        //         errorMessage = 'Please enter a valid NIC number';
        //         isValid = false;
        //     }
        //     break;

        case 'contactNumber':
            // Sri Lankan phone number validation
            const phoneRegex = /^(?:\+94|0)?[0-9]{9}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                errorMessage = 'Please enter a valid contact number';
                isValid = false;
            }
            break;

        case 'address':
            if (value.length < 5) {
                errorMessage = 'Address must be at least 5 characters long';
                isValid = false;
            }
            break;

        case 'password':
            const passwordValidation = validatePassword(value);
            if (!passwordValidation.isValid) {
                errorMessage = passwordValidation.message;
                isValid = false;
            }
            break;

        case 'confirmPassword':
            const password = document.getElementById('password').value;
            if (value !== password) {
                errorMessage = 'Passwords do not match';
                isValid = false;
            }
            break;
    }

    showError(input, errorMessage);
    return isValid;
}

// Password validation
function validatePassword(password) {
    const minLength = 5;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return { isValid: false, message: 'Password must be at least 5 characters long' };
    }

    if (!hasUpperCase || !hasLowerCase) {
        return { isValid: false, message: 'Password must contain both uppercase and lowercase letters' };
    }

    if (!hasNumbers) {
        return { isValid: false, message: 'Password must contain at least one number' };
    }

    // if (!hasSpecialChar) {
    //     return { isValid: false, message: 'Password must contain at least one special character' };
    // }

    return { isValid: true, message: '' };
}

// // Check password strength
// function checkPasswordStrength() {
//     const password = document.getElementById('password').value;
//     const strengthIndicator = document.getElementById('passwordStrength');
//
//     if (password.length === 0) {
//         strengthIndicator.classList.remove('show', 'weak', 'medium', 'strong');
//         return;
//     }
//
//     let strength = 0;
//
//     // Length check
//     if (password.length >= 8) strength++;
//     if (password.length >= 12) strength++;
//
//     // Character variety checks
//     if (/[a-z]/.test(password)) strength++;
//     if (/[A-Z]/.test(password)) strength++;
//     if (/[0-9]/.test(password)) strength++;
//     if (/[^A-Za-z0-9]/.test(password)) strength++;
//
//     strengthIndicator.classList.add('show');
//     strengthIndicator.classList.remove('weak', 'medium', 'strong');
//
//     if (strength <= 2) {
//         strengthIndicator.classList.add('weak');
//     } else if (strength <= 4) {
//         strengthIndicator.classList.add('medium');
//     } else {
//         strengthIndicator.classList.add('strong');
//     }
// }

// Validate password match
function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorElement = document.getElementById('confirmPasswordError');

    if (confirmPassword && password !== confirmPassword) {
        showError(document.getElementById('confirmPassword'), 'Passwords do not match');
    } else {
        clearError(document.getElementById('confirmPassword'));
    }
}

// Show error message
function showError(input, message) {
    const errorElement = document.getElementById(input.name + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        if (message) {
            errorElement.classList.add('show');
            input.style.borderColor = '#f56565';
        } else {
            errorElement.classList.remove('show');
            input.style.borderColor = '#48bb78';
        }
    }
}

// Clear error message
function clearError(input) {
    const errorElement = document.getElementById(input.name + 'Error');
    if (errorElement) {
        errorElement.classList.remove('show');
        errorElement.textContent = '';
        input.style.borderColor = '#e1e5e9';
    }
}

// Handle form submission
function handleFormSubmission(event) {
    event.preventDefault();

    const form = event.target;
    const inputs = form.querySelectorAll('input[required]');
    let isFormValid = true;

    // Validate all fields
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    // Check if passwords match
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        showError(document.getElementById('confirmPassword'), 'Passwords do not match');
        isFormValid = false;
    }

    if (isFormValid) {
        showLoadingState();
        // Submit the form
        form.submit();
    } else {
        // Scroll to first error
        const firstError = form.querySelector('.error-message.show');
        if (firstError) {
            firstError.closest('.form-group').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
}

// Show loading state
function showLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
}

// Format contact number as user types
document.getElementById('contactNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');

    // Add country code if not present
    if (value.length > 0 && !value.startsWith('94') && !value.startsWith('0')) {
        if (value.length === 9) {
            value = '0' + value;
        }
    }

    // Format the number
    if (value.startsWith('0') && value.length <= 10) {
        if (value.length > 3) {
            value = value.substring(0, 3) + ' ' + value.substring(3);
        }
        if (value.length > 7) {
            value = value.substring(0, 7) + ' ' + value.substring(7);
        }
    }

    e.target.value = value;
});

// Format NIC as user types
document.getElementById('nic').addEventListener('input', function(e) {
    let value = e.target.value.toUpperCase();

    // Remove any non-alphanumeric characters except V and X
    value = value.replace(/[^0-9VX]/g, '');

    e.target.value = value;
});

// Auto-hide success/error messages
function hideMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    });
}

// Add smooth animations for form interactions
function addSmoothAnimations() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addSmoothAnimations);