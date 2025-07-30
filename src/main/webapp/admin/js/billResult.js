// Global variables
let redirectTimer;
let countdownTimer;
let currentCount = 10;
let redirectCancelled = false;

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Initialize page functionality
function initializePage() {
    displayCurrentTime();
    startAutoRedirect();
    addPageAnimations();
    setupAccessibility();

    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyNavigation);

    // Add hover effects to buttons
    addButtonEffects();

    // Check if we should show additional success features
    if (isSuccessPage()) {
        addSuccessFeatures();
    }
}

// Display current time
function displayCurrentTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        timeElement.textContent = now.toLocaleDateString('en-US', options);

        // Update time every second
        setInterval(() => {
            const currentTime = new Date();
            timeElement.textContent = currentTime.toLocaleDateString('en-US', options);
        }, 1000);
    }
}

// Start auto-redirect functionality
function startAutoRedirect() {
    const autoRedirectElement = document.getElementById('autoRedirect');

    if (!autoRedirectElement) return;

    // Start countdown
    countdownTimer = setInterval(updateCountdown, 1000);

    // Start redirect timer
    redirectTimer = setTimeout(() => {
        if (!redirectCancelled) {
            redirectToDashboard();
        }
    }, 10000);

    // Initialize progress bar
    updateProgressBar();
}

// Update countdown display
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    const progressFill = document.getElementById('progressFill');

    if (countdownElement && !redirectCancelled) {
        currentCount--;
        countdownElement.textContent = currentCount;

        // Update progress bar
        const progressPercentage = ((10 - currentCount) / 10) * 100;
        if (progressFill) {
            progressFill.style.width = progressPercentage + '%';
        }

        if (currentCount <= 0) {
            clearInterval(countdownTimer);
        }
    }
}

// Update progress bar
function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        let progress = 0;
        const progressTimer = setInterval(() => {
            if (redirectCancelled) {
                clearInterval(progressTimer);
                return;
            }

            progress += 1;
            progressFill.style.width = progress + '%';

            if (progress >= 100) {
                clearInterval(progressTimer);
            }
        }, 100);
    }
}

// Cancel auto-redirect
function cancelRedirect() {
    redirectCancelled = true;
    clearTimeout(redirectTimer);
    clearInterval(countdownTimer);

    const autoRedirectElement = document.getElementById('autoRedirect');
    if (autoRedirectElement) {
        autoRedirectElement.style.opacity = '0';
        autoRedirectElement.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            autoRedirectElement.remove();
        }, 300);
    }

    // Show cancellation message
    showNotification('Auto-redirect cancelled', 'info');
}

// Redirect to dashboard
function redirectToDashboard() {
    // Add loading overlay
    showLoadingOverlay();

    // Redirect after brief delay
    setTimeout(() => {
        const dashboardUrl = document.querySelector('.btn.secondary')?.href || '/admin/dashboard.jsp';
        window.location.href = dashboardUrl;
    }, 1000);
}

// Print receipt functionality
function printReceipt() {
    // Create print-friendly content
    const printContent = createPrintContent();

    // Open print dialog
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();

    // Show success message
    showNotification('Print dialog opened', 'success');
}

// Create print-friendly content
function createPrintContent() {
    const currentTime = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const messageContent = document.querySelector('.message-content')?.textContent || 'Bill processed successfully';

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Bill Receipt</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    padding: 20px; 
                    line-height: 1.6;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .header { 
                    text-align: center; 
                    border-bottom: 2px solid #333; 
                    padding-bottom: 20px; 
                    margin-bottom: 30px;
                }
                .company-name {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 5px;
                }
                .receipt-title {
                    font-size: 18px;
                    color: #666;
                }
                .content { 
                    margin: 20px 0; 
                    padding: 20px;
                    background: #f9f9f9;
                    border-radius: 8px;
                }
                .footer { 
                    text-align: center; 
                    margin-top: 30px; 
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                    color: #666;
                    font-size: 12px;
                }
                .timestamp {
                    font-weight: bold;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="company-name">Bookstore Management System</div>
                <div class="receipt-title">Bill Processing Receipt</div>
            </div>
            <div class="content">
                <p><strong>Status:</strong> ${messageContent}</p>
                <p><strong>Processed On:</strong> <span class="timestamp">${currentTime}</span></p>
                <p><strong>System:</strong> Bill Management System v1.0</p>
            </div>
            <div class="footer">
                <p>This is an automated receipt. Please keep for your records.</p>
                <p>&copy; 2025 Bookstore Management System. All rights reserved.</p>
            </div>
        </body>
        </html>
    `;
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icon = getNotificationIcon(type);
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '12px',
        color: 'white',
        fontWeight: '600',
        fontSize: '14px',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        minWidth: '250px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)';
            break;
        case 'info':
        default:
            notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'info':
        default: return 'fa-info-circle';
    }
}

// Show loading overlay
function showLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="spinner"></div>
            <p>Redirecting to dashboard...</p>
        </div>
    `;

    // Style the overlay
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '9999',
        backdropFilter: 'blur(5px)'
    });

    // Add spinner styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-content {
            text-align: center;
            color: white;
        }
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-left: 4px solid #fff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        .loading-content p {
            font-size: 16px;
            font-weight: 500;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);
}

// Add page animations
function addPageAnimations() {
    // Animate result card entrance
    const resultCard = document.querySelector('.result-card');
    if (resultCard) {
        resultCard.style.opacity = '0';
        resultCard.style.transform = 'translateY(30px)';
        resultCard.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            resultCard.style.opacity = '1';
            resultCard.style.transform = 'translateY(0)';
        }, 100);
    }

    // Animate info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });

    // Animate buttons
    const buttons = document.querySelectorAll('.action-buttons .btn');
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });
}

// Setup accessibility features
function setupAccessibility() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim();
            button.setAttribute('aria-label', text);
        }
    });

    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, a, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid rgba(102, 126, 234, 0.5)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Handle keyboard navigation
function handleKeyNavigation(event) {
    switch (event.key) {
        case 'Escape':
            if (!redirectCancelled) {
                cancelRedirect();
            }
            break;
        case 'Enter':
            if (event.target.classList.contains('cancel-redirect')) {
                cancelRedirect();
            }
            break;
        case 'p':
        case 'P':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                if (isSuccessPage()) {
                    printReceipt();
                }
            }
            break;
        case 'd':
        case 'D':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                redirectToDashboard();
            }
            break;
    }
}

// Add button effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add hover sound effect (optional)
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add ripple animation keyframes
    if (!document.querySelector('#ripple-styles')) {
        const rippleStyles = document.createElement('style');
        rippleStyles.id = 'ripple-styles';
        rippleStyles.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyles);
    }
}

// Check if this is a success page
function isSuccessPage() {
    const successMessage = document.querySelector('.success-message');
    const successIcon = document.querySelector('.icon-wrapper.success');
    return successMessage !== null || successIcon !== null;
}

// Add success-specific features
function addSuccessFeatures() {
    // Add confetti effect for success
    createConfettiEffect();

    // Add success sound (if browser supports it)
    playSuccessSound();

    // Add celebration animation to icon
    const successIcon = document.querySelector('.icon-wrapper.success');
    if (successIcon) {
        setTimeout(() => {
            successIcon.style.animation = 'celebrate 1s ease-in-out';
        }, 500);
    }

    // Add success-specific keyboard shortcuts info
    showKeyboardShortcuts();
}

// Create confetti effect
function createConfettiEffect() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
        overflow: hidden;
    `;

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        const colors = ['#667eea', '#764ba2', '#48bb78', '#38a169', '#ed8936', '#dd6b20'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${randomColor};
            top: -10px;
            left: ${Math.random() * 100}%;
            transform: rotate(${Math.random() * 360}deg);
            animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
        `;

        confettiContainer.appendChild(confetti);
    }

    document.body.appendChild(confettiContainer);

    // Add confetti animation
    if (!document.querySelector('#confetti-styles')) {
        const confettiStyles = document.createElement('style');
        confettiStyles.id = 'confetti-styles';
        confettiStyles.textContent = `
            @keyframes confetti-fall {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
            @keyframes celebrate {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.1) rotate(-5deg); }
                50% { transform: scale(1.2) rotate(0deg); }
                75% { transform: scale(1.1) rotate(5deg); }
            }
        `;
        document.head.appendChild(confettiStyles);
    }

    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Play success sound (if supported)
function playSuccessSound() {
    try {
        // Create a simple success tone using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        // Silently fail if Web Audio API is not supported
        console.log('Audio not supported');
    }
}

// Show keyboard shortcuts
function showKeyboardShortcuts() {
    const shortcutsInfo = document.createElement('div');
    shortcutsInfo.className = 'keyboard-shortcuts';
    shortcutsInfo.innerHTML = `
        <div class="shortcuts-title">
            <i class="fas fa-keyboard"></i>
            Keyboard Shortcuts
        </div>
        <div class="shortcuts-list">
            <span><kbd>Ctrl+P</kbd> Print Receipt</span>
            <span><kbd>Ctrl+D</kbd> Go to Dashboard</span>
            <span><kbd>Esc</kbd> Cancel Auto-redirect</span>
        </div>
    `;

    shortcutsInfo.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 12px;
        padding: 15px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        font-size: 0.85rem;
        color: #4a5568;
        max-width: 250px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    const shortcutsStyles = document.createElement('style');
    shortcutsStyles.textContent = `
        .keyboard-shortcuts .shortcuts-title {
            font-weight: 600;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
            color: #667eea;
        }
        .keyboard-shortcuts .shortcuts-list {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .keyboard-shortcuts kbd {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            padding: 2px 6px;
            font-family: monospace;
            font-size: 0.8rem;
            margin-right: 8px;
        }
    `;
    document.head.appendChild(shortcutsStyles);

    document.body.appendChild(shortcutsInfo);

    // Show shortcuts after a delay
    setTimeout(() => {
        shortcutsInfo.style.opacity = '1';
        shortcutsInfo.style.transform = 'translateY(0)';
    }, 2000);

    // Auto-hide after 10 seconds
    setTimeout(() => {
        shortcutsInfo.style.opacity = '0';
        shortcutsInfo.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (shortcutsInfo.parentNode) {
                shortcutsInfo.remove();
            }
        }, 300);
    }, 12000);
}