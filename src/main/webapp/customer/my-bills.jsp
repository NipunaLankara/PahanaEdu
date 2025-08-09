<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="servlet.pahanaedu.bill.dto.BillDTO" %>
<%@ page import="servlet.pahanaedu.bill.dto.BuyBookDTO" %>

<%
    List<BillDTO> bills = (List<BillDTO>) request.getAttribute("bills");
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Bills - PahanaEdu</title>
    <link rel="stylesheet" href="css/bill.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
<div class="page-wrapper">
    <header class="page-header">
        <div class="header-content">
            <h1 class="page-title">
                <i class="fas fa-receipt"></i>
                Your Bills
            </h1>
            <div class="header-stats">
                    <span class="bills-count">
                        <i class="fas fa-file-invoice"></i>
                        <%= bills != null ? bills.size() : 0 %> Bills
                    </span>
            </div>
        </div>
    </header>

    <main class="bills-container">
        <% if (bills == null || bills.isEmpty()) { %>
        <div class="empty-state">
            <div class="empty-icon">
                <i class="fas fa-receipt"></i>
            </div>
            <h3>No Bills Found</h3>
            <p>You haven't made any purchases yet.</p>
            <a href="books.jsp" class="cta-button">
                <i class="fas fa-book"></i>
                Browse Books
            </a>
        </div>
        <% } else { %>
        <div class="bills-grid">
            <% for (BillDTO bill : bills) { %>
            <div class="bill-card" data-bill-id="<%= bill.getId() %>">
                <div class="bill-header">
                    <div class="bill-info">
                        <div class="bill-number">
                            <i class="fas fa-hashtag"></i>
                            Bill #<%= bill.getId() %>
                        </div>
                        <div class="bill-date">
                            <i class="fas fa-calendar-alt"></i>
                            <%= bill.getCreatedAt() %>
                        </div>
                    </div>
                    <div class="bill-total">
                        <span class="total-label">Total</span>
                        <span class="total-amount">LKR <%= String.format("%.2f", bill.getTotalAmount()) %></span>
                    </div>
                </div>

                <div class="bill-body">
                    <div class="items-header">
                        <h4>
                            <i class="fas fa-list"></i>
                            Items Purchased
                        </h4>
                        <span class="items-count"><%= bill.getItems().size() %> items</span>
                    </div>

                    <div class="items-container">
                        <% for (BuyBookDTO item : bill.getItems()) { %>
                        <div class="item-row">
                            <div class="item-details">
                                <div class="book-title">
                                    <i class="fas fa-book"></i>
                                    <%= item.getBook().getTitle() %>
                                </div>
                                <div class="item-meta">
                                    <span class="quantity">Qty: <%= item.getQuantity() %></span>
                                    <span class="unit-price">@ LKR <%= String.format("%.2f", item.getPrice()) %></span>
                                </div>
                            </div>
                            <div class="item-subtotal">
                                LKR <%= String.format("%.2f", item.getPrice() * item.getQuantity()) %>
                            </div>
                        </div>
                        <% } %>
                    </div>
                </div>

                <div class="bill-actions">
                    <button class="action-btn view-details" onclick="toggleBillDetails(this)">
                        <i class="fas fa-eye"></i>
                        View Details
                    </button>
                    <button class="action-btn download-bill" onclick="downloadBill('<%= bill.getId() %>')">
                        <i class="fas fa-download"></i>
                        Download
                    </button>
                </div>
            </div>
            <% } %>
        </div>
        <% } %>
    </main>

    <div class="floating-summary" id="billsSummary">
        <div class="summary-content">
            <div class="summary-item">
                <span class="summary-label">Total Bills:</span>
                <span class="summary-value"><%= bills != null ? bills.size() : 0 %></span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Total Spent:</span>
                <span class="summary-value">
                        LKR <%= bills != null ? String.format("%.2f", bills.stream().mapToDouble(BillDTO::getTotalAmount).sum()) : "0.00" %>
                    </span>
            </div>
        </div>
    </div>
</div>

<script src="js/bill.js"></script>
</body>
</html>