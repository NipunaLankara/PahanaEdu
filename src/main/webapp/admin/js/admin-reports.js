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
