// Modern Bill Page JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Add smooth animations to elements
    animateElements();

    // Initialize form validation
    initializeValidation();

    // Add interactive effects
    addInteractiveEffects();

    // Initialize tooltips
    initializeTooltips();
}

function addBookInput() {
    const container = document.getElementById("bookInputs");
    const div = document.createElement("div");
    div.className = "form-row";
    div.style.opacity = "0";
    div.style.transform = "translateY(-20px)";

    div.innerHTML = `
        <input type="number" name="bookId" placeholder="Book ID" required />
        <input type="number" name="quantity" placeholder="Quantity" required min="1" />
        <button type="button" class="btn remove-btn" onclick="removeBookInput(this)" title="Remove this book">
            <i>×</i>
        </button>
    `;

    container.appendChild(div);

    // Animate the new row
    setTimeout(() => {
        div.style.transition = "all 0.3s ease";
        div.style.opacity = "1";
        div.style.transform = "translateY(0)";
    }, 50);

    // Add focus to the first input
    const firstInput = div.querySelector('input[name="bookId"]');
    if (firstInput) {
        firstInput.focus();
    }

    // Update button count
    updateAddButtonText();
}

function removeBookInput(button) {
    const row = button.closest('.form-row');
    if (row) {
        row.style.transition = "all 0.3s ease";
        row.style.opacity = "0";
        row.style.transform = "translateX(-20px)";

        setTimeout(() => {
            row.remove();
            updateAddButtonText();
        }, 300);
    }
}

function updateAddButtonText() {
    const addButton = document.querySelector('.add-btn');
    const bookInputs = document.querySelectorAll('#bookInputs .form-row');

    if (addButton) {
        const count = bookInputs.length;
        addButton.innerHTML = count === 0 ?
            '+ Add First Book' :
            `+ Add Another Book (${count} added)`;
    }
}

function animateElements() {
    // Animate sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

function initializeValidation() {
    const form = document.getElementById('billForm');
    const submitBtn = document.querySelector('.submit-btn');

    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                showValidationError();
            } else {
                showLoadingState(submitBtn);
            }
        });

        // Real-time validation
        form.addEventListener('input', function() {
            clearValidationErrors();
            updateSubmitButton();
        });
    }
}

function validateForm() {
    const customerEmail = document.querySelector('input[name="customerEmail"]');
    const bookIds = document.querySelectorAll('input[name="bookId"]');
    const quantities = document.querySelectorAll('input[name="quantity"]');

    let isValid = true;

    // Validate email
    if (!customerEmail || !customerEmail.value.trim()) {
        showFieldError(customerEmail, 'Customer email is required');
        isValid = false;
    } else if (!isValidEmail(customerEmail.value)) {
        showFieldError(customerEmail, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate book inputs
    if (bookIds.length === 0) {
        showError('Please add at least one book to the bill');
        isValid = false;
    } else {
        bookIds.forEach((bookId, index) => {
            if (!bookId.value || bookId.value <= 0) {
                showFieldError(bookId, 'Please enter a valid Book ID');
                isValid = false;
            }

            const quantity = quantities[index];
            if (!quantity.value || quantity.value <= 0) {
                showFieldError(quantity, 'Please enter a valid quantity');
                isValid = false;
            }
        });
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
    field.style.borderColor = '#e74c3c';
    field.style.boxShadow = '0 0 10px rgba(231, 76, 60, 0.3)';

    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);
}

function clearValidationErrors() {
    // Clear field errors
    document.querySelectorAll('.field-error').forEach(error => error.remove());

    // Reset field styles
    document.querySelectorAll('input').forEach(input => {
        input.style.borderColor = '#e8f4fd';
        input.style.boxShadow = '';
    });

    // Clear general errors
    const errorDiv = document.querySelector('.validation-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function showValidationError() {
    const container = document.querySelector('.container');
    const existingError = document.querySelector('.validation-error');

    if (!existingError) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-error error';
        errorDiv.innerHTML = '⚠️ Please correct the errors above before submitting.';

        container.insertBefore(errorDiv, container.firstChild);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function showError(message) {
    const container = document.querySelector('.container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error error';
    errorDiv.innerHTML = `⚠️ ${message}`;

    container.insertBefore(errorDiv, container.firstChild);
}

function showLoadingState(button) {
    if (button) {
        button.disabled = true;
        button.innerHTML = '<span>Processing...</span> <div class="spinner"></div>';
        button.style.opacity = '0.7';
    }
}

function updateSubmitButton() {
    const submitBtn = document.querySelector('.submit-btn');
    const isFormValid = document.querySelectorAll('.field-error').length === 0;

    if (submitBtn) {
        if (isFormValid) {
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        } else {
            submitBtn.style.opacity = '0.7';
        }
    }
}

function addInteractiveEffects() {
    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'all 0.2s ease';
        });

        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add pulse effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });

    // Add floating labels effect
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentNode.style.transform = 'translateY(0)';
        });
    });
}

function initializeTooltips() {
    // Add tooltips to inputs
    const bookIdInputs = document.querySelectorAll('input[name="bookId"]');
    const quantityInputs = document.querySelectorAll('input[name="quantity"]');

    bookIdInputs.forEach(input => {
        input.title = 'Enter the unique identifier for the book';
    });

    quantityInputs.forEach(input => {
        input.title = 'Enter the number of copies to purchase';
    });
}

// Utility functions
function formatCurrency(amount) {
    return `Rs. ${parseFloat(amount).toFixed(2)}`;
}

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

// Add CSS for spinner and pulse animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
        margin-left: 8px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .remove-btn {
        background: linear-gradient(45deg, #dc3545, #c82333);
        color: white;
        border: none;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
    }
    
    .remove-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 12px rgba(220, 53, 69, 0.4);
    }
    
    .field-error {
        animation: shake 0.5s ease-in-out;
    }
`;

document.head.appendChild(style);