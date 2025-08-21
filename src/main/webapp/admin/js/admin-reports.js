// Admin Reports JavaScript
class AdminReports {
    constructor() {
        this.init();
    }

    init() {
        this.updateDateTime();
        this.setupEventListeners();
        this.animateTableRows();

        // Update date/time every minute
        setInterval(() => this.updateDateTime(), 60000);
    }

    updateDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        const currentDateElement = document.getElementById('currentDate');
        const generateTimeElement = document.getElementById('generateTime');

        if (currentDateElement) {
            currentDateElement.textContent = `Last Updated: ${now.toLocaleDateString('en-US', options)}`;
        }

        if (generateTimeElement) {
            generateTimeElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }

    setupEventListeners() {
        // Add smooth scroll behavior for hash links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + P for print
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                this.printReports();
            }

            // Ctrl/Cmd + R for refresh
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                e.preventDefault();
                this.refreshData();
            }
        });
    }

    animateTableRows() {
        const rows = document.querySelectorAll('.report-table tbody tr');
        rows.forEach((row, index) => {
            row.style.animationDelay = `${index * 0.1}s`;
            row.classList.add('fade-in');
        });
    }

    showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('show');
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('show');
        }
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${type === 'success' ? '#155724' : '#721c24'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 350px;
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    }

    formatNumber(num) {
        return new Intl.NumberFormat('en-US').format(num);
    }

    calculateGrowth(current, previous) {
        if (!previous || previous === 0) return 0;
        return ((current - previous) / previous * 100).toFixed(1);
    }

    sortTable(tableId, columnIndex, dataType = 'string') {
        const table = document.getElementById(tableId);
        if (!table) return;

        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort((a, b) => {
            const aValue = a.children[columnIndex].textContent.trim();
            const bValue = b.children[columnIndex].textContent.trim();

            switch(dataType) {
                case 'number':
                    return parseFloat(bValue.replace(/[^0-9.-]/g, '')) - parseFloat(aValue.replace(/[^0-9.-]/g, ''));
                case 'date':
                    return new Date(bValue) - new Date(aValue);
                default:
                    return aValue.localeCompare(bValue);
            }
        });

        rows.forEach(row => tbody.appendChild(row));
        this.showNotification('Table sorted successfully!');
    }

    exportToCSV(tableId, filename = 'report') {
        const table = document.getElementById(tableId);
        if (!table) return;

        let csv = [];
        const rows = table.querySelectorAll('tr');

        rows.forEach(row => {
            const cols = row.querySelectorAll('td, th');
            const rowData = Array.from(cols).map(col =>
                `"${col.textContent.trim().replace(/"/g, '""')}"`
            );
            csv.push(rowData.join(','));
        });

        const csvContent = csv.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        this.showNotification('CSV exported successfully!');
    }
}

// Global functions that can be called from JSP
function printReports() {
    // Hide elements that shouldn't be printed
    const elementsToHide = document.querySelectorAll('.controls, .loading-overlay');
    elementsToHide.forEach(el => el.style.display = 'none');

    // Add print-specific styles
    const printStyles = document.createElement('style');
    printStyles.textContent = `
        @media print {
            body * { visibility: hidden; }
            .container, .container * { visibility: visible; }
            .container { position: absolute; left: 0; top: 0; width: 100%; }
            .header { background: #2c3e50 !important; color: white !important; }
        }
    `;
    document.head.appendChild(printStyles);

    window.print();

    // Restore hidden elements
    setTimeout(() => {
        elementsToHide.forEach(el => el.style.display = '');
        document.head.removeChild(printStyles);
    }, 1000);

    adminReports.showNotification('Print dialog opened!');
}

function exportReports() {
    adminReports.showLoading();

    // Simulate export process
    setTimeout(() => {
        adminReports.hideLoading();
        adminReports.showNotification('Reports exported successfully!');

        // You can implement actual PDF export here
        // For example, using libraries like jsPDF or html2canvas
    }, 2000);
}

function refreshData() {
    adminReports.showLoading();

    // Simulate data refresh
    setTimeout(() => {
        adminReports.hideLoading();
        adminReports.updateDateTime();
        adminReports.showNotification('Data refreshed successfully!');

        // Add animation to tables
        const tables = document.querySelectorAll('.report-table tbody tr');
        tables.forEach((row, index) => {
            row.style.animation = 'none';
            setTimeout(() => {
                row.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s forwards`;
            }, 10);
        });

        // In a real application, you would make an AJAX call here
        // to fetch fresh data from the server
    }, 1500);
}

function sortTableBy(tableClass, columnIndex, dataType = 'string') {
    const table = document.querySelector(`.${tableClass}`);
    if (table) {
        adminReports.sortTable(table.id || tableClass, columnIndex, dataType);
    }
}

function exportTableToCSV(tableClass, filename) {
    const table = document.querySelector(`.${tableClass}`);
    if (table) {
        adminReports.exportToCSV(table.id || tableClass, filename);
    }
}

// Enhanced table interactions
function addTableInteractivity() {
    // Add sortable headers
    const headers = document.querySelectorAll('.report-table th');
    headers.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.style.userSelect = 'none';
        header.title = 'Click to sort';

        header.addEventListener('click', () => {
            const table = header.closest('table');
            const dataType = header.textContent.toLowerCase().includes('date') ? 'date' :
                header.textContent.toLowerCase().includes('sales') ||
                header.textContent.toLowerCase().includes('spent') ||
                header.textContent.toLowerCase().includes('sold') ? 'number' : 'string';

            adminReports.sortTable(table.className, index, dataType);
        });

        // Add sort indicator
        header.innerHTML += ' <span class="sort-indicator">↕️</span>';
    });

    // Add row hover effects
    const rows = document.querySelectorAll('.report-table tbody tr');
    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });

        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Chart functionality (if you want to add charts)
function createSimpleChart(containerId, data, type = 'bar') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Simple ASCII-style chart for demonstration
    // In a real application, you'd use Chart.js or similar library
    let chartHTML = '<div class="ascii-chart">';

    if (type === 'bar') {
        const maxValue = Math.max(...data.map(item => item.value));
        data.forEach(item => {
            const barWidth = (item.value / maxValue) * 100;
            chartHTML += `
                <div class="chart-bar">
                    <div class="bar-label">${item.label}</div>
                    <div class="bar-container">
                        <div class="bar" style="width: ${barWidth}%"></div>
                        <span class="bar-value">${item.value}</span>
                    </div>
                </div>
            `;
        });
    }

    chartHTML += '</div>';
    container.innerHTML = chartHTML;

    // Add chart styles
    const chartStyles = `
        .ascii-chart {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .chart-bar {
            margin: 10px 0;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .bar-label {
            min-width: 120px;
            font-weight: 500;
        }
        .bar-container {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .bar {
            height: 25px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 4px;
            transition: all 0.3s ease;
            min-width: 2px;
        }
        .bar:hover {
            opacity: 0.8;
            transform: scaleY(1.1);
        }
        .bar-value {
            font-weight: 600;
            color: #495057;
            min-width: 50px;
        }
    `;

    if (!document.getElementById('chart-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'chart-styles';
        styleSheet.textContent = chartStyles;
        document.head.appendChild(styleSheet);
    }
}

// Data validation and error handling
function validateTableData() {
    const tables = document.querySelectorAll('.report-table');
    let hasData = false;

    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        const hasValidData = Array.from(rows).some(row =>
            !row.querySelector('.no-data')
        );

        if (hasValidData) {
            hasData = true;
        } else {
            // Add empty state styling
            table.classList.add('empty-table');
        }
    });

    if (!hasData) {
        console.warn('No data available in any tables');
    }

    return hasData;
}

// Performance monitoring
function monitorPerformance() {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd -
            window.performance.timing.navigationStart;

        console.log(`Page loaded in ${loadTime}ms`);

        if (loadTime > 3000) {
            console.warn('Slow page load detected');
        }
    }
}

// Accessibility improvements
function enhanceAccessibility() {
    // Add ARIA labels to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim();
            button.setAttribute('aria-label', text);
        }
    });

    // Add table captions for screen readers
    const tables = document.querySelectorAll('.report-table');
    tables.forEach((table, index) => {
        if (!table.querySelector('caption')) {
            const section = table.closest('.report-section');
            const heading = section ? section.querySelector('h2') : null;

            if (heading) {
                const caption = document.createElement('caption');
                caption.textContent = heading.textContent;
                caption.style.position = 'absolute';
                caption.style.left = '-9999px';
                table.insertBefore(caption, table.firstChild);
            }
        }
    });

    // Ensure proper tab order
    const interactiveElements = document.querySelectorAll('button, a, [tabindex]');
    interactiveElements.forEach((element, index) => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
}

// Error handling
function handleErrors() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        adminReports.showNotification('An error occurred. Please refresh the page.', 'error');
    });

    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        adminReports.showNotification('An error occurred. Please refresh the page.', 'error');
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global instance
    window.adminReports = new AdminReports();

    // Add additional functionality
    addTableInteractivity();
    validateTableData();
    enhanceAccessibility();
    handleErrors();

    // Monitor performance
    window.addEventListener('load', monitorPerformance);

    // Add notification styles to head
    const notificationStyles = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            margin-left: auto;
            padding: 0 5px;
            color: inherit;
            opacity: 0.7;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);

    console.log('Admin Reports Dashboard initialized successfully!');
});

// Export functions for external use
window.AdminReportsAPI = {
    printReports,
    exportReports,
    refreshData,
    sortTableBy,
    exportTableToCSV,
    createSimpleChart
};