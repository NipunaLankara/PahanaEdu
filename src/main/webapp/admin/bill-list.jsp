<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bills Display Design</title>
    <link rel="stylesheet" href="css/billList.css">
</head>
<body>
<!-- Your existing JSP code would go here with the CSS classes applied -->

<%@ page import="java.util.List" %>
<%@ page import="servlet.pahanaedu.bill.dto.BillDTO" %>
<%@ page import="servlet.pahanaedu.bill.dto.BuyBookDTO" %>
<%@ page import="servlet.pahanaedu.user.dto.UserDTO" %>

<% List<BillDTO> bills = (List<BillDTO>) request.getAttribute("bills"); %>

<div class="bills-container">
    <h2 class="page-title">All Bills</h2>

    <% for (BillDTO bill : bills) {
        UserDTO customer = bill.getCustomer(); %>

    <div class="bill-card">
        <div class="bill-header">
            <div class="bill-total">
                <span class="total-label">Bill Total:</span>
                <span class="total-amount">LKR <%= bill.getTotalAmount() %></span>
            </div>

            <div class="customer-info">
                <% if (customer != null) { %>
                <p class="customer-details">
                    <strong>Customer:</strong> <%= customer.getName() %>
                    <span class="customer-email">(<%= customer.getEmail() %>)</span>
                </p>
                <% } else { %>
                <p class="customer-details unknown">
                    <strong>Customer:</strong> Unknown
                </p>
                <% } %>
            </div>
        </div>

        <div class="items-section">
            <table class="items-table">
                <thead>
                <tr>
                    <th>Book Title</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                <% for (BuyBookDTO item : bill.getItems()) { %>
                <tr class="item-row">
                    <td class="book-title"><%= item.getBook().getTitle() %>
                    </td>
                    <td class="quantity"><%= item.getQuantity() %>
                    </td>
                    <td class="unit-price">LKR <%= item.getPrice() %>
                    </td>
                    <td class="subtotal">LKR <%= item.getPrice() * item.getQuantity() %>
                    </td>
                </tr>
                <% } %>
                </tbody>
            </table>
        </div>
    </div>
    <% } %>
</div>

<script src="js/billLIst.js"></script>
</body>
</html>

