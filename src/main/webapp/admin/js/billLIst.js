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