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