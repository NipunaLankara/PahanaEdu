// Bills Display JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // Initialize page functionality
    initializeBillsPage();

    function initializeBillsPage() {
        addHoverEffects();
        addClickHandlers();
        addKeyboardNavigation();
        addPrintFunctionality();
        animateOnScroll();
        addSearchFunctionality();
        addSortFunctionality();
    }

    // Add enhanced hover effects
    function addHoverEffects() {
        const billCards = document.querySelectorAll('.bill-card');

        billCards.forEach((card, index) => {
            // Stagger animation delays
            card.style.animationDelay = `${index * 0.1}s`;

            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Add click handlers for better UX
    function addClickHandlers() {
        const itemRows = document.querySelectorAll('.item-row');

        itemRows.forEach(row => {
            row.addEventListener('click', function() {
                // Highlight selected row
                itemRows.forEach(r => r.classList.remove('selected'));
                this.classList.add('selected');

                // Show item details (could be expanded for modals)
                showItemDetails(this);
            });
        });
    }

    // Show item details on click
    function showItemDetails(row) {
        const bookTitle = row.querySelector('.book-title').textContent;
        const quantity = row.querySelector('.quantity').textContent;
        const price = row.querySelector('.unit-price').textContent;

        // Create temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'item-tooltip';
        tooltip.innerHTML = `
            <strong>${bookTitle}</strong><br>
            Qty: ${quantity} | Price: ${price}
        `;

        document.body.appendChild(tooltip);

        // Position tooltip
        const rect = row.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - 60) + 'px';
        tooltip.style.background = '#333';
        tooltip.style.color = 'white';
        tooltip.style.padding = '10px';
        tooltip.style.borderRadius = '8px';
        tooltip.style.fontSize = '0.8rem';
        tooltip.style.zIndex = '1000';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s';

        // Animate in
        setTimeout(() => tooltip.style.opacity = '1', 10);

        // Remove after 3 seconds
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 3000);
    }

    // Add keyboard navigation
    function addKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Clear all selections
                document.querySelectorAll('.item-row.selected').forEach(row => {
                    row.classList.remove('selected');
                });

                // Remove tooltips
                document.querySelectorAll('.item-tooltip').forEach(tooltip => {
                    tooltip.remove();
                });
            }
        });
    }

    // Add print functionality
    function addPrintFunctionality() {
        // Add print button if it doesn't exist
        if (!document.querySelector('.print-btn')) {
            const printBtn = document.createElement('button');
            printBtn.className = 'print-btn';
            printBtn.innerHTML = '🖨️ Print Bills';
            printBtn.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                transition: all 0.3s ease;
                z-index: 1000;
            `;

            printBtn.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    window.print();
                }, 150);
            });

            printBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
            });

            printBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            });

            document.body.appendChild(printBtn);
        }
    }

    // Animate elements on scroll
    function animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.bill-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }

    // Add search functionality
    function addSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="billSearch" placeholder="🔍 Search bills by customer name or book title..." />
        `;
        searchContainer.style.cssText = `
            margin-bottom: 20px;
            text-align: center;
        `;

        const searchInput = searchContainer.querySelector('#billSearch');
        searchInput.style.cssText = `
            width: 100%;
            max-width: 400px;
            padding: 12px 20px;
            border: 2px solid rgba(102, 126, 234, 0.2);
            border-radius: 25px;
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.9);
        `;

        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
            this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
        });

        searchInput.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(102, 126, 234, 0.2)';
            this.style.boxShadow = 'none';
        });

        // Insert search before bills
        const pageTitle = document.querySelector('.page-title');
        pageTitle.parentNode.insertBefore(searchContainer, pageTitle.nextSibling);

        // Add search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const billCards = document.querySelectorAll('.bill-card');

            billCards.forEach(card => {
                const customerName = card.querySelector('.customer-details')?.textContent.toLowerCase() || '';
                const bookTitles = Array.from(card.querySelectorAll('.book-title'))
                    .map(title => title.textContent.toLowerCase()).join(' ');

                const isVisible = customerName.includes(searchTerm) || bookTitles.includes(searchTerm);

                card.style.display = isVisible ? 'block' : 'none';

                if (isVisible) {
                    card.style.animation = 'slideInUp 0.3s ease-out';
                }
            });
        });
    }

    // Add sort functionality
    function addSortFunctionality() {
        const sortContainer = document.createElement('div');
        sortContainer.className = 'sort-container';
        sortContainer.innerHTML = `
            <select id="billSort">
                <option value="">📊 Sort by...</option>
                <option value="total-asc">Total Amount (Low to High)</option>
                <option value="total-desc">Total Amount (High to Low)</option>
                <option value="customer">Customer Name</option>
            </select>
        `;
        sortContainer.style.cssText = `
            text-align: center;
            margin-bottom: 20px;
        `;

        const sortSelect = sortContainer.querySelector('#billSort');
        sortSelect.style.cssText = `
            padding: 10px 15px;
            border: 2px solid rgba(102, 126, 234, 0.2);
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.9);
            font-size: 0.9rem;
            cursor: pointer;
            outline: none;
            transition: all 0.3s ease;
        `;

        // Insert sort after search
        const searchContainer = document.querySelector('.search-container');
        searchContainer.parentNode.insertBefore(sortContainer, searchContainer.nextSibling);

        sortSelect.addEventListener('change', function() {
            const sortType = this.value;
            const billsContainer = document.querySelector('.bills-container');
            const billCards = Array.from(document.querySelectorAll('.bill-card'));

            if (!sortType) return;

            billCards.sort((a, b) => {
                switch(sortType) {
                    case 'total-asc':
                        const totalA = parseFloat(a.querySelector('.total-amount').textContent.replace('LKR ', ''));
                        const totalB = parseFloat(b.querySelector('.total-amount').textContent.replace('LKR ', ''));
                        return totalA - totalB;

                    case 'total-desc':
                        const totalA2 = parseFloat(a.querySelector('.total-amount').textContent.replace('LKR ', ''));
                        const totalB2 = parseFloat(b.querySelector('.total-amount').textContent.replace('LKR ', ''));
                        return totalB2 - totalA2;

                    case 'customer':
                        const customerA = a.querySelector('.customer-details').textContent;
                        const customerB = b.querySelector('.customer-details').textContent;
                        return customerA.localeCompare(customerB);

                    default:
                        return 0;
                }
            });

            // Re-append sorted cards
            billCards.forEach(card => billsContainer.appendChild(card));
        });
    }

    // Add CSS for selected rows
    const style = document.createElement('style');
    style.textContent = `
        .item-row.selected {
            background-color: rgba(102, 126, 234, 0.1) !important;
            transform: scale(1.02);
        }
        
        .item-tooltip {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            pointer-events: none;
        }
        
        @media (max-width: 768px) {
            .print-btn {
                position: relative !important;
                top: auto !important;
                right: auto !important;
                margin: 10px auto;
                display: block;
            }
        }
    `;
    document.head.appendChild(style);

    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    console.log('Bills page initialized successfully! 🎉');
});