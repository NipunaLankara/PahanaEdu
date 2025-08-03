// Dashboard JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Initialize animations
    initializeAnimations();

    // Add interactive effects
    addCardInteractions();

    // Initialize notifications
    initializeNotifications();

    // Add keyboard shortcuts
    addKeyboardShortcuts();

    // Initialize tooltips
    initializeTooltips();

    console.log('Dashboard initialized successfully');
}

function initializeAnimations() {
    // Stagger animation for cards
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });

    // Animate welcome section
    const welcomeSection = document.querySelector('.welcome-section');
    if (welcomeSection) {
        welcomeSection.style.opacity = '0';
        welcomeSection.style.transform = 'translateY(-30px)';

        setTimeout(() => {
            welcomeSection.style.transition = 'all 0.8s ease';
            welcomeSection.style.opacity = '1';
            welcomeSection.style.transform = 'translateY(0)';
        }, 50);
    }
}

function addCardInteractions() {
    const cards = document.querySelectorAll('.dashboard-card');

    cards.forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add focus for accessibility
        const cardAction = card.querySelector('.card-action');
        if (cardAction) {
            cardAction.addEventListener('focus', function() {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.15)';
            });

            cardAction.addEventListener('blur', function() {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            });
        }
    });
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = 60;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 1000;
        max-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification .close-btn {
        position: absolute;
        top: 5px;
        right: 10px;
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.7;
    }
    
    .notification .close-btn:hover {
        opacity: 1;
    }
    
    .tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .tooltip.show {
        opacity: 1;
    }
`;
document.head.appendChild(style);

function initializeNotifications() {
    // Check for any notifications or updates
    setTimeout(() => {
        showNotification('Welcome to your dashboard! 🎉', 'success');
    }, 1500);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        ${message}
        <button class="close-btn" onclick="this.parentElement.remove()">&times;</button>
    `;

    // Add type-specific styling
    if (type === 'success') {
        notification.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
    } else if (type === 'warning') {
        notification.style.background = 'linear-gradient(45deg, #feca57, #ff9ff3)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a5a)';
    }

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Alt + P for Profile
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            const profileLink = document.querySelector('.profile-card .card-action');
            if (profileLink) profileLink.click();
        }

        // Alt + B for Bills
        if (e.altKey && e.key === 'b') {
            e.preventDefault();
            const billsLink = document.querySelector('.bills-card .card-action');
            if (billsLink) billsLink.click();
        }

        // Alt + K for Books
        if (e.altKey && e.key === 'k') {
            e.preventDefault();
            const booksLink = document.querySelector('.books-card .card-action');
            if (booksLink) booksLink.click();
        }

        // Alt + H for Help
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            const helpLink = document.querySelector('.support-card .card-action');
            if (helpLink) helpLink.click();
        }
    });

    // Show keyboard shortcuts notification
    setTimeout(() => {
        showNotification('💡 Tip: Use Alt+P (Profile), Alt+B (Bills), Alt+K (Books), Alt+H (Help) for quick navigation!', 'info');
    }, 3000);
}

function initializeTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');

    elements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            showTooltip(e, this.getAttribute('data-tooltip'));
        });

        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(event, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.id = 'dashboard-tooltip';

    document.body.appendChild(tooltip);

    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

    setTimeout(() => {
        tooltip.classList.add('show');
    }, 100);
}

function hideTooltip() {
    const tooltip = document.getElementById('dashboard-tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }
}

// Quick action functions
function showNotifications() {
    showNotification('📬 You have 3 new notifications!', 'info');

    // Simulate loading notifications
    setTimeout(() => {
        const notificationsList = [
            'Your recent order has been processed',
            'New books available in your category',
            'Monthly bill is ready for review'
        ];

        notificationsList.forEach((notification, index) => {
            setTimeout(() => {
                showNotification(`${index + 1}. ${notification}`, 'success');
            }, 1000 * (index + 1));
        });
    }, 500);
}

// Utility functions
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

// Enhanced card loading with shimmer effect
function addShimmerEffect() {
    const cards = document.querySelectorAll('.dashboard-card');

    cards.forEach(card => {
        card.style.background = 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)';
        card.style.backgroundSize = '200% 100%';
        card.style.animation = 'shimmer 2s infinite';
    });
}

// Performance monitoring
function trackUserInteraction(action, element) {
    console.log(`User interaction: ${action} on ${element}`);
    // Here you could send analytics data to your backend
}

// Add interaction tracking to all clickable elements
document.addEventListener('click', function(e) {
    if (e.target.closest('.card-action')) {
        trackUserInteraction('card_click', e.target.closest('.dashboard-card').className);
    }

    if (e.target.closest('.quick-action-btn')) {
        trackUserInteraction('quick_action', e.target.textContent.trim());
    }
});

// Initialize dashboard features
console.log('Dashboard JavaScript loaded successfully');

// Export functions for global use
window.showNotification = showNotification;
window.showNotifications = showNotifications;