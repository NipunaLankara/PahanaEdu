<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Bill</title>
    <link rel="stylesheet" href="css/createBill.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <div class="bill-wrapper">
        <div class="header">
            <div class="header-icon">
                <i class="fas fa-receipt"></i>
            </div>
            <h2>Create New Bill</h2>
            <p class="subtitle">Generate invoice for customer purchase</p>
        </div>

        <form id="billForm" action="create-bill" method="post">
            <!-- Customer Information Section -->
            <div class="section">
                <div class="section-header">
                    <i class="fas fa-user"></i>
                    <h3>Customer Information</h3>
                </div>

                <div class="form-group">
                    <label for="customerEmail">
                        <i class="fas fa-envelope"></i>
                        Customer Email Address
                    </label>
                    <input type="email" id="customerEmail" name="customerEmail" required
                           placeholder="Enter customer email">
                    <span class="error-message" id="emailError"></span>
                </div>
            </div>

            <!-- Books Section -->
            <div class="section">
                <div class="section-header">
                    <i class="fas fa-book"></i>
                    <h3>Book Items</h3>
                    <button type="button" class="add-book-btn" onclick="addBook()">
                        <i class="fas fa-plus"></i>
                        Add Book
                    </button>
                </div>

                <div id="books-container">
                    <div class="book-entry" data-index="0">
                        <div class="book-header">
                            <span class="book-number">Book #1</span>
                            <button type="button" class="remove-btn" onclick="removeBook(this)" style="display: none;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>

                        <div class="book-fields">
                            <div class="form-group">
                                <label>
                                    <i class="fas fa-barcode"></i>
                                    Book ID
                                </label>
                                <input type="number" name="bookId" required min="1"
                                       placeholder="Enter book ID">
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
                                    <input type="number" name="quantity" required min="1" value="1"
                                           placeholder="Qty" onchange="calculateTotal()">
                                    <button type="button" class="qty-btn plus" onclick="adjustQuantity(this, 1)">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <span class="error-message"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bill Summary Section -->
            <div class="section">
                <div class="section-header">
                    <i class="fas fa-calculator"></i>
                    <h3>Bill Summary</h3>
                </div>

                <div class="summary-card">
                    <div class="summary-row">
                        <span>Total Items:</span>
                        <span id="totalItems">1</span>
                    </div>
                    <div class="summary-row">
                        <span>Total Books:</span>
                        <span id="totalBooks">1</span>
                    </div>
                    <div class="summary-row total">
                        <span>Estimated Total:</span>
                        <span id="estimatedTotal">Calculating...</span>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
                <button type="button" class="btn secondary" onclick="resetForm()">
                    <i class="fas fa-undo"></i>
                    Reset Form
                </button>

                <button type="submit" class="btn primary">
                    <i class="fas fa-file-invoice"></i>
                    Create Bill
                </button>
            </div>
        </form>

        <!-- Success/Error Messages -->
        <div id="messageContainer"></div>
    </div>
</div>

<script src="js/createBill.js"></script>
</body>
</html>