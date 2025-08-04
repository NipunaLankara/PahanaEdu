// Bill List JavaScript Functions
document.addEventListener('DOMContentLoaded', function() {
    initializeBillList();
    setupEventListeners();
    animateCards();
});

/**
 * Initialize the bill list functionality
 */
function initializeBillList() {
    console.log('Bill list initialized');

    // Add loading animation
    const billCards = document.querySelectorAll('.bill-card');
    billCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Initialize floating summary
    updateFloatingSummary();

    // Set up intersection observer for animations
    setupIntersectionObserver();
}

/**
 * Setup event listeners for interactive elements
 */
function setupEventListeners() {
    // Handle scroll events for floating summary
    window.addEventListener('scroll', handleScroll);

    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Add click handlers for bill cards
    const billCards = document.querySelectorAll('.bill-card');
    billCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.action-btn')) {
                highlightCard(this);
            }
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

/**
 * Toggle bill details visibility
 * @param {HTMLElement} button - The button that was clicked
 */
function toggleBillDetails(button) {
    const billCard = button.closest('.bill-card');
    const itemsContainer = billCard.querySelector('.items-container');
    const isExpanded = billCard.classList.contains('expanded');

    if (isExpanded) {
        // Collapse
        billCard.classList.remove('expanded');
        itemsContainer.style.maxHeight = '200px';
        itemsContainer.style.overflow = 'hidden';
        button.innerHTML = '<i class="fas fa-eye"></i> View Details';

        // Add fade effect
        itemsContainer.style.position = 'relative';
        if (!itemsContainer.querySelector('.fade-overlay')) {
            const fadeOverlay = document.createElement('div');
            fadeOverlay.className = 'fade-overlay';
            fadeOverlay.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 50px;
                background: linear-gradient(transparent, #f7fafc);
                pointer-events: none;
            `;
            itemsContainer.appendChild(fadeOverlay);
        }
    } else {
        // Expand
        billCard.classList.add('expanded');
        itemsContainer.style.maxHeight = 'none';
        itemsContainer.style.overflow = 'visible';
        button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Details';

        // Remove fade effect
        const fadeOverlay = itemsContainer.querySelector('.fade-overlay');
        if (fadeOverlay) {
            fadeOverlay.remove();
        }
    }

    // Add ripple effect
    addRippleEffect(button);
}

/**
 * Download bill functionality
 * @param {string} billId - The ID of the bill to download
 */
function downloadBill(billId) {
    // Show loading state
    const button = event.target.closest('.download-bill');
    const originalContent = button.innerHTML;

    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    button.disabled = true;

    // Simulate download process
    setTimeout(() => {
        // In a real application, you would make an AJAX call to generate and download the PDF
        console.log(`Downloading bill ${billId}`);

        // For demo purposes, we'll just show a success message
        showNotification(`Bill #${billId} downloaded successfully!`, 'success');

        // Reset button
        button.innerHTML = originalContent;
        button.disabled = false;

        // Add success animation
        button.style.background = '#48bb78';
        setTimeout(() => {
            button.style.background = '';
        }, 1000);

    }, 2000);

    // Add ripple effect
    addRippleEffect(button);
}

/**
 * Highlight selected card
 * @param {HTMLElement} card - The card to highlight
 */
function highlightCard(card) {
    // Remove highlight from other cards
    document.querySelectorAll('.bill-card').forEach(c => {
        c.classList.remove('highlighted');
    });

    // Add highlight to selected card
    card.classList.add('highlighted');

    // Add highlight styles dynamically
    if (!document.getElementById('highlight-styles')) {
        const style = document.createElement('style');
        style.id = 'highlight-styles';
        style.textContent = `
            .bill-card.highlighted {
                transform: translateY(-8px) scale(1.02);
                box-shadow: 0 20px 50px rgba(102, 126, 234, 0.3);
                border: 2px solid #667eea;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Add ripple effect to buttons
 * @param {HTMLElement} element - The element to add ripple effect to
 */
function addRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;

    // Add ripple animation keyframes if not exists
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Show notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, info)
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add notification styles
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                border-left: 4px solid #667eea;
            }
            .notification-success { border-left-color: #48bb78; }
            .notification-error { border-left-color: #e53e3e; }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification.show {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Handle scroll events
 */
function handleScroll() {
    const summary = document.getElementById('billsSummary');
    if (!summary) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Show/hide floating summary based on scroll position
    if (scrollTop > 300) {
        summary.style.opacity = '1';
        summary.style.transform = 'translateY(0)';
    } else {
        summary.style.opacity = '0.8';
        summary.style.transform = 'translateY(10px)';
    }
}

/**
 * Handle window resize
 */
function handleResize() {
    // Adjust grid layout on resize
    const grid = document.querySelector('.bills-grid');
    if (grid && window.innerWidth < 768) {
        grid.style.gridTemplateColumns = '1fr';
    } else if (grid) {
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(400px, 1fr))';
    }
}

/**
 * Handle keyboard navigation
 * @param {KeyboardEvent} e - The keyboard event
 */
function handleKeyboardNavigation(e) {
    const billCards = document.querySelectorAll('.bill-card');
    const currentCard = document.querySelector('.bill-card.highlighted');

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();

        let index = 0;
        if (currentCard) {
            index = Array.from(billCards).indexOf(currentCard);
        }

        if (e.key === 'ArrowDown') {
            index = (index + 1) % billCards.length;
        } else {
            index = (index - 1 + billCards.length) % billCards.length;
        }

        highlightCard(billCards[index]);
        billCards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (e.key === 'Enter' && currentCard) {
        const viewDetailsBtn = currentCard.querySelector('.view-details');
        if (viewDetailsBtn) {
            viewDetailsBtn.click();
        }
    }
}

/**
 * Setup intersection observer for animations
 */
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

//