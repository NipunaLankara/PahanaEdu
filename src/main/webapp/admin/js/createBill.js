// Global variables
let bookCounter = 1;

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    updateSummary();
});

// Initialize form functionality
function initializeForm() {
    const form = document.getElementById('billForm');
    const emailInput = document.getElementById('customerEmail');

    // Add event listeners
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', clearEmailError);

    // Form submission handler
    form.addEventListener('submit', handleFormSubmission);

    // Initialize quantity change listeners
    initializeQuantityListeners();
}

// Add new book entry
function addBook() {
    bookCounter++;
    const container = document.getElementById('books-container');

    // Create new book entry
    const newBookEntry = createBookEntry(bookCounter);

    // Add animation class
    newBookEntry.style.opacity = '0';
    newBookEntry.style.transform = 'translateX(-20px)';

    container.appendChild(newBookEntry);

    // Trigger animation
    setTimeout(() => {
        newBookEntry.style.opacity = '1';
        newBookEntry.style.transform = 'translateX(0)';
    }, 10);

    // Update remove button visibility
    updateRemoveButtons();

    // Initialize listeners for new entry
    initializeBookListeners(newBookEntry);

    // Update summary
    updateSummary();

    // Scroll to new book entry
    newBookEntry.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Create book entry HTML
function createBookEntry(index) {
    const bookEntry = document.createElement('div');
    bookEntry.className = 'book-entry';
    bookEntry.setAttribute('data-index', index - 1);

    bookEntry.innerHTML = `
        <div class="book-header">
            <span class="book-number">Book #${index}</span>
            <button type="button" class="remove-btn" onclick="removeBook(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        
        <div class="book-fields">
            <div class="form-group">
                <label>
                    <i class="fas fa-barcode"></i>
                    Book ID
                </label>
                <input type="number" name="bookId" required min="1" placeholder="Enter book ID">
                <span class="error-message"></span>
            </div>
            
            <div class="form-group">
                <label>
                    <i class="fas fa-hashtag"></i>
                    Quantity
                </label>
                <div class="quantity-wrapper">
                    <button type="button" class="qty-btn minus" onclick="adjustQuantity(this, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" name="quantity" required min="1" value="1" placeholder="Qty">
                    <button type="button" class="qty-btn plus" onclick="adjustQuantity(this, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <span class="error-message"></span>
            </div>
        </div>
    `;

    return bookEntry;
}

// Remove book entry
function removeBook(button) {
    const bookEntry = button.closest('.book-entry');
    const container = document.getElementById('books-container');

    if (container.children.length <= 1) {
        showMessage('Cannot remove the last book entry', 'error');
        return;
    }

    // Add exit animation
    bookEntry.style.opacity = '0';
    bookEntry.style.transform = 'translateX(-20px)';

    setTimeout(() => {
        bookEntry.remove();
        updateBookNumbers();
        updateRemoveButtons();
        updateSummary();
    }, 300);
}

// Update book numbers after removal
function updateBookNumbers() {
    const bookEntries = document.querySelectorAll('.book-entry');
    bookEntries.forEach((entry, index) => {
        const bookNumber = entry.querySelector('.book-number');
        bookNumber.textContent = `Book #${index + 1}`;
        entry.setAttribute('data-index', index);
    });
    bookCounter = bookEntries.length;
}

// Update visibility of remove buttons
function updateRemoveButtons() {
    const bookEntries = document.querySelectorAll('.book-entry');
    const removeButtons = document.querySelectorAll('.remove-btn');

    removeButtons.forEach(button => {
        button.style.display = bookEntries.length > 1 ? 'block' : 'none';
    });
}

// Adjust quantity using +/- buttons
function adjustQuantity(button, change) {
    const input = button.parentElement.querySelector('input[name="quantity"]');
    let currentValue = parseInt(input.value) || 1;
    let newValue = currentValue + change;

    if (newValue < 1) newValue = 1;
    if (newValue > 999) newValue = 999;

    input.value = newValue;

    // Add visual feedback
    input.style.transform = 'scale(1.05)';
    setTimeout(() => {
        input.style.transform = 'scale(1)';
    }, 150);

    updateSummary();
}

// Initialize quantity change listeners
function initializeQuantityListeners() {
    document.addEventListener('change', function(e) {
        if (e.target.name === 'quantity') {
            updateSummary();
        }
    });
}

// Initialize listeners for a specific book entry
function initializeBookListeners(bookEntry) {
    const inputs = bookEntry.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateBookField(input));
        input.addEventListener('input', () => clearBookError(input));

        if (input.name === 'quantity') {
            input.addEventListener('change', updateSummary);
        }
    });
}

// Validate email field
function validateEmail() {
    const emailInput = document.getElementById('customerEmail');
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showEmailError('Please enter a valid email address');
        return false;
    }

    clearEmailError();
    return true;
}

// Show email error
function showEmailError(message) {
    const errorElement = document.getElementById('emailError');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    document.getElementById('customerEmail').style.borderColor = '#ff6b6b';
}

// Clear email error
function clearEmailError() {
    const errorElement = document.getElementById('emailError');
    errorElement.classList.remove('show');
    errorElement.textContent = '';
    document.getElementById('customerEmail').style.borderColor = '#e1e5e9';
}

// Validate book fields
function validateBookField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (input.name === 'bookId') {
        if (!value || parseInt(value) < 1) {
            errorMessage = 'Please enter a valid book ID';
            isValid = false;
        } else if (isDuplicateBookId(input, value)) {
            errorMessage = 'This book ID is already added';
            isValid = false;
        }
    } else if (input.name === 'quantity') {
        if (!value || parseInt(value) < 1) {
            errorMessage = 'Quantity must be at least 1';
            isValid = false;
        } else if (parseInt(value) > 999) {
            errorMessage = 'Maximum quantity is 999';
            isValid = false;
        }
    }

    showBookError(input, errorMessage);
    return isValid;
}

// Check for duplicate book IDs
function isDuplicateBookId(currentInput, bookId) {
    const allBookIdInputs = document.querySelectorAll('input[name="bookId"]');

    for (let input of allBookIdInputs) {
        if (input !== currentInput && input.value === bookId) {
            return true;
        }
    }

    return false;
}

// Show book field error
function showBookError(input, message) {
    const errorElement = input.parentElement.querySelector('.error-message');

    if (errorElement) {
        errorElement.textContent = message;
        if (message) {
            errorElement.classList.add('show');
            input.style.borderColor = '#ff6b6b';
        } else {
            errorElement.classList.remove('show');
            input.style.borderColor = '#48bb78';
        }
    }
}

// Clear book field error
function clearBookError(input) {
    const errorElement = input.parentElement.querySelector('.error-message');

    if (errorElement) {
        errorElement.classList.remove('show');
        errorElement.textContent = '';
        input.style.borderColor = '#e1e5e9';
    }
}

// Update bill summary
function updateSummary() {
    const bookEntries = document.querySelectorAll('.book-entry');
    let totalItems = bookEntries.length;
    let totalBooks = 0;

    bookEntries.forEach(entry => {
        const quantityInput = entry.querySelector('input[name="quantity"]');
        const quantity = parseInt(quantityInput.value) || 0;
        totalBooks += quantity;
    });

    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('totalBooks').textContent = totalBooks;
    document.getElementById('estimatedTotal').textContent = `${totalBooks} books selected`;
}

// Handle form submission
function handleFormSubmission(event) {
    event.preventDefault();

    const form = event.target;
    let isFormValid = true;

    // Validate email
    if (!validateEmail()) {
        isFormValid = false;
    }

    // Validate all book entries
    const bookEntries = document.querySelectorAll('.book-entry');
    bookEntries.forEach(entry => {
        const inputs = entry.querySelectorAll('input');
        inputs.forEach(input => {
            if (!validateBookField(input)) {
                isFormValid = false;
            }
        });
    });

    // Check for empty book entries
    if (bookEntries.length === 0) {
        showMessage('Please add at least one book to the bill', 'error');
        isFormValid = false;
    }

    if (isFormValid) {
        showLoadingState();
        showMessage('Creating bill...', 'success');

        // Simulate form submission (replace with actual submission)
        setTimeout(() => {
            form.submit();
        }, 1000);
    } else {
        // Scroll to first error
        const firstError = form.querySelector('.error-message.show');
        if (firstError) {
            firstError.closest('.form-group').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }

        showMessage('Please fix the errors in the form', 'error');
    }
}

// Show loading state
function showLoadingState() {
    const submitBtn = document.querySelector('.btn.primary');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Bill...';
}

// Reset form to initial state
function resetForm() {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
        const form = document.getElementById('billForm');
        const container = document.getElementById('books-container');

        // Reset form fields
        form.reset();

        // Clear all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.classList.remove('show');
            error.textContent = '';
        });

        // Reset input border colors
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.borderColor = '#e1e5e9';
        });

        // Remove all book entries except the first one
        const bookEntries = container.querySelectorAll('.book-entry');
        bookEntries.forEach((entry, index) => {
            if (index > 0) {
                entry.remove();
            }
        });

        // Reset book counter
        bookCounter = 1;

        // Update book numbers and remove buttons
        updateBookNumbers();
        updateRemoveButtons();

        // Reset summary
        updateSummary();

        // Clear messages
        clearMessages();

        // Focus on email field
        document.getElementById('customerEmail').focus();

        showMessage('Form has been reset', 'success');
    }
}

// Show message to user
function showMessage(message, type) {
    const container = document.getElementById('messageContainer');

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    messageDiv.innerHTML = `
        <i class="fas ${icon}"></i>
        ${message}
    `;

    container.appendChild(messageDiv);

    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }
    }, 5000);
}

// Clear all messages
function clearMessages() {
    const container = document.getElementById('messageContainer');
    container.innerHTML = '';
}

// Auto-save functionality (optional)
function autoSave() {
    const formData = {
        customerEmail: document.getElementById('customerEmail').value,
        books: []
    };

    const bookEntries = document.querySelectorAll('.book-entry');
    bookEntries.forEach(entry => {
        const bookId = entry.querySelector('input[name="bookId"]').value;
        const quantity = entry.querySelector('input[name="quantity"]').value;

        if (bookId && quantity) {
            formData.books.push({ bookId, quantity });
        }
    });

    // Save to localStorage (if available)
    try {
        localStorage.setItem('billFormData', JSON.stringify(formData));
    } catch (e) {
        // Handle localStorage errors silently
        console.warn('Could not save form data:', e);
    }
}

// Load auto-saved data (optional)
function loadSavedData() {
    try {
        const savedData = localStorage.getItem('billFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);

            // Load email
            if (formData.customerEmail) {
                document.getElementById('customerEmail').value = formData.customerEmail;
            }

            // Load books
            if (formData.books && formData.books.length > 0) {
                const container = document.getElementById('books-container');
                container.innerHTML = ''; // Clear existing

                formData.books.forEach((book, index) => {
                    const bookEntry = createBookEntry(index + 1);
                    bookEntry.querySelector('input[name="bookId"]').value = book.bookId;
                    bookEntry.querySelector('input[name="quantity"]').value = book.quantity;
                    container.appendChild(bookEntry);
                    initializeBookListeners(bookEntry);
                });

                bookCounter = formData.books.length;
                updateRemoveButtons();
                updateSummary();
            }
        }
    } catch (e) {
        // Handle localStorage errors silently
        console.warn('Could not load saved data:', e);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('billForm').dispatchEvent(new Event('submit'));
    }

    // Ctrl/Cmd + N to add new book
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        addBook();
    }

    // Escape to clear messages
    if (e.key === 'Escape') {
        clearMessages();
    }
});

// Initialize auto-save (every 30 seconds)
setInterval(autoSave, 30000);

// Load saved data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
});

// Format numbers as user types
document.addEventListener('input', function(e) {
    if (e.target.name === 'bookId' || e.target.name === 'quantity') {
        // Remove any non-digit characters
        let value = e.target.value.replace(/\D/g, '');

        // Limit length
        if (e.target.name === 'bookId' && value.length > 10) {
            value = value.substring(0, 10);
        } else if (e.target.name === 'quantity' && value.length > 3) {
            value = value.substring(0, 3);
        }

        e.target.value = value;
    }
});

// Enhanced validation for real-time feedback
document.addEventListener('input', function(e) {
    if (e.target.name === 'customerEmail') {
        const email = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            e.target.style.borderColor = '#ffa500'; // Orange for partial input
        } else if (email && emailRegex.test(email)) {
            e.target.style.borderColor = '#48bb78'; // Green for valid
        } else {
            e.target.style.borderColor = '#e1e5e9'; // Default
        }
    }
});

// Add smooth animations for better UX
function addSmoothAnimations() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addSmoothAnimations);

// Prevent form submission on Enter key in input fields
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        // Only prevent if not in the last input of a book entry
        const bookEntry = e.target.closest('.book-entry');
        const inputs = bookEntry.querySelectorAll('input');
        const lastInput = inputs[inputs.length - 1];

        if (e.target !== lastInput) {
            e.preventDefault();
            // Focus next input
            const nextInput = e.target.parentElement.parentElement.nextElementSibling?.querySelector('input');
            if (nextInput) {
                nextInput.focus();
            }
        }
    }
});