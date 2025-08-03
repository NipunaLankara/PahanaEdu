// Fixed Bill Page JavaScript to match JSP structure

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

    // Initialize existing remove buttons (if any)
    initializeRemoveButtons();
}

// Initialize remove buttons for any existing dynamically added rows
function initializeRemoveButtons() {
    const existingRemoveButtons = document.querySelectorAll('.remove-btn');
    existingRemoveButtons.forEach(button => {
        // Remove any existing event listeners and add new one
        button.replaceWith(button.cloneNode(true));
        const newButton = document.querySelector('.remove-btn:last-of-type') || button;
        newButton.addEventListener('click', function() {
            removeBookInput(this);
        });
    });
}

// This function matches the JSP's addBookInput structure with select dropdown
// Only define if not already defined in JSP
if (typeof addBookInput === 'undefined') {
    function addBookInput() {
        const container = document.getElementById("bookInputs");
        const div = document.createElement("div");
        div.className = "form-row";
        div.style.opacity = "0";
        div.style.transform = "translateY(-20px)";

        // Get the book options from the existing select element
        const existingSelect = container.querySelector('select[name="bookId"]');
        let optionsHTML = '<option value="">-- Select Book --</option>';

        if (existingSelect) {
            // Copy options from existing select
            const options = existingSelect.querySelectorAll('option');
            options.forEach(option => {
                if (option.value !== '') {
                    optionsHTML += option.outerHTML;
                }
            });
        } else {
            optionsHTML += '<option disabled>No books available</option>';
        }

        div.innerHTML = `
            <select name="bookId" required>
                ${optionsHTML}
            </select>
            <input type="number" name="quantity" placeholder="Quantity" required min="1" />
            <button type="button" class="btn remove-btn" title="Remove this book">
                ×
            </button>
        `;

        container.appendChild(div);

        // Add event listener to the remove button (instead of onclick attribute)
        const removeBtn = div.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            removeBookInput(this);
        });

        // Animate the new row
        setTimeout(() => {
            div.style.transition = "all 0.3s ease";
            div.style.opacity = "1";
            div.style.transform = "translateY(0)";
        }, 50);

        // Add focus to the select
        const firstSelect = div.querySelector('select[name="bookId"]');
        if (firstSelect) {
            firstSelect.focus();
        }

        // Update button count
        updateAddButtonText();
    }
}

// Make addBookInput globally available
window.addBookInput = function() {
    const container = document.getElementById("bookInputs");
    const div = document.createElement("div");
    div.className = "form-row";
    div.style.opacity = "0";
    div.style.transform = "translateY(-20px)";

    // Get the book options from the existing select element
    const existingSelect = container.querySelector('select[name="bookId"]');
    let optionsHTML = '<option value="">-- Select Book --</option>';

    if (existingSelect) {
        // Copy options from existing select
        const options = existingSelect.querySelectorAll('option');
        options.forEach(option => {
            if (option.value !== '') {
                optionsHTML += option.outerHTML;
            }
        });
    } else {
        optionsHTML += '<option disabled>No books available</option>';
    }

    div.innerHTML = `
        <select name="bookId" required>
            ${optionsHTML}
        </select>
        <input type="number" name="quantity" placeholder="Quantity" required min="1" />
        <button type="button" class="btn remove-btn" title="Remove this book">
            ×
        </button>
    `;

    container.appendChild(div);

    // Add event listener to the remove button (instead of onclick attribute)
    const removeBtn = div.querySelector('.remove-btn');
    removeBtn.addEventListener('click', function() {
        removeBookInput(this);
    });

    // Animate the new row
    setTimeout(() => {
        div.style.transition = "all 0.3s ease";
        div.style.opacity = "1";
        div.style.transform = "translateY(0)";
    }, 50);

    // Add focus to the select
    const firstSelect = div.querySelector('select[name="bookId"]');
    if (firstSelect) {
        firstSelect.focus();
    }

    // Update button count
    updateAddButtonText();
};

function removeBookInput(button) {
    console.log('Remove button clicked'); // Debug log
    const row = button.closest('.form-row');
    console.log('Found row:', row); // Debug log

    if (row) {
        // Check if this is the only book input row
        const allRows = document.querySelectorAll('#bookInputs .form-row');
        if (allRows.length <= 1) {
            alert('You must have at least one book in the bill');
            return;
        }

        row.style.transition = "all 0.3s ease";
        row.style.opacity = "0";
        row.style.transform = "translateX(-20px)";

        setTimeout(() => {
            row.remove();
            updateAddButtonText();
            console.log('Row removed'); // Debug log
        }, 300);
    } else {
        console.log('Row not found'); // Debug log
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

// Functions that match JSP action handling - check if they already exist
if (typeof setAction === 'undefined') {
    function setAction(actionValue) {
        document.getElementById('actionInput').value = actionValue;
    }
}

if (typeof submitForm === 'undefined') {
    function submitForm(action) {
        document.getElementById('actionInput').value = action;
        document.getElementById('billForm').submit();
    }
}

// Make these functions globally available
window.setAction = function(actionValue) {
    document.getElementById('actionInput').value = actionValue;
};

window.submitForm = function(action) {
    document.getElementById('actionInput').value = action;
    document.getElementById('billForm').submit();
};

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
    // Check for both select dropdowns AND hidden inputs
    const bookSelects = document.querySelectorAll('select[name="bookId"]');
    const bookHiddenInputs = document.querySelectorAll('input[type="hidden"][name="bookId"]');
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

    // Validate book inputs - check for either select dropdowns OR hidden inputs
    const totalBooks = bookSelects.length + bookHiddenInputs.length;

    if (totalBooks === 0) {
        showError('Please add at least one book to the bill');
        isValid = false;
    } else {
        // Validate select dropdowns (if any)
        bookSelects.forEach((bookSelect, index) => {
            if (!bookSelect.value) {
                showFieldError(bookSelect, 'Please select a book');
                isValid = false;
            }

            // Find corresponding quantity input (not hidden)
            const visibleQuantities = document.querySelectorAll('input[name="quantity"]:not([type="hidden"])');
            const quantity = visibleQuantities[index];
            if (quantity && (!quantity.value || quantity.value <= 0)) {
                showFieldError(quantity, 'Please enter a valid quantity');
                isValid = false;
            }
        });

        // Hidden inputs are already validated by the server, so we don't need to validate them again
        // But we can check if there are visible quantity inputs that need validation
        const visibleQuantities = document.querySelectorAll('input[name="quantity"]:not([type="hidden"])');
        if (bookSelects.length > 0 && visibleQuantities.length !== bookSelects.length) {
            showError('Quantity inputs missing for some books');
            isValid = false;
        }
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

    // Reset field styles for both inputs and selects
    document.querySelectorAll('input, select').forEach(field => {
        field.style.borderColor = '#e8f4fd';
        field.style.boxShadow = '';
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

    // Add floating labels effect for inputs and selects
    const formFields = document.querySelectorAll('input, select');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.style.transform = 'translateY(-2px)';
        });

        field.addEventListener('blur', function() {
            this.parentNode.style.transform = 'translateY(0)';
        });
    });
}

function initializeTooltips() {
    // Add tooltips to selects and inputs
    const bookSelects = document.querySelectorAll('select[name="bookId"]');
    const quantityInputs = document.querySelectorAll('input[name="quantity"]');

    bookSelects.forEach(select => {
        select.title = 'Select a book from the available options';
    });

    quantityInputs.forEach(input => {
        input.title = 'Enter the number of copies to purchase';
    });

    // Add tooltip to verify email button
    const verifyBtn = document.querySelector('.verify-btn');
    if (verifyBtn) {
        verifyBtn.title = 'Click to verify the customer email address';
    }
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

// Add CSS for animations and styling
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
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
        margin-left: 10px;
    }
    
    .remove-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 12px rgba(220, 53, 69, 0.4);
    }
    
    .field-error {
        animation: shake 0.5s ease-in-out;
    }
    
    .form-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
    }
    
    .form-row select,
    .form-row input {
        flex: 1;
    }
`;

document.head.appendChild(style);