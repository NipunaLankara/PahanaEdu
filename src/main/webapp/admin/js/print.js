// print.js - Enhanced Print Functionality

// Enhanced window load function with better user experience
window.onload = function() {
    // Add a small delay to ensure page is fully rendered
    setTimeout(function() {
        // Add print-ready class for any final styling adjustments
        document.body.classList.add('print-ready');

        // Show a brief loading message (optional)
        showPrintMessage();

        // Trigger print dialog
        window.print();
    }, 500);
};

// Function to show a brief print message
function showPrintMessage() {
    // Create and show a temporary message
    const message = document.createElement('div');
    message.innerHTML = '📄 Preparing your bill for printing...';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(message);

    // Remove message after 2 seconds
    setTimeout(function() {
        message.style.opacity = '0';
        setTimeout(function() {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, 2000);
}

// Handle print events
window.addEventListener('beforeprint', function() {
    console.log('Preparing to print bill...');
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    console.log('Print dialog closed');
    document.body.classList.remove('printing');

    // Optional: Show completion message
    showCompletionMessage();
});

// Function to show completion message
function showCompletionMessage() {
    const message = document.createElement('div');
    message.innerHTML = '✅ Print ready! You can now close this window.';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        cursor: pointer;
    `;

    // Click to dismiss
    message.addEventListener('click', function() {
        message.style.opacity = '0';
        setTimeout(function() {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    });

    document.body.appendChild(message);

    // Auto remove after 5 seconds
    setTimeout(function() {
        if (message.parentNode) {
            message.style.opacity = '0';
            setTimeout(function() {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }
    }, 5000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+P or Cmd+P to print again
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }

    // Escape to close window (optional)
    if (e.key === 'Escape') {
        if (confirm('Close this bill window?')) {
            window.close();
        }
    }
});

// Add smooth animations to table rows
document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(function(row, index) {
        row.style.animationDelay = (index * 0.1) + 's';
        row.style.animation = 'fadeInRow 0.5s ease-out forwards';
    });
});

// Add CSS for row animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInRow {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    tbody tr {
        opacity: 0;
    }
    
    .printing .bill-container {
        animation: none;
    }
`;
document.head.appendChild(style);