<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="servlet.pahanaedu.bill.dto.BillDTO" %>
<%@ page import="servlet.pahanaedu.bill.dto.BuyBookDTO" %>

<% List<BillDTO> bills = (List<BillDTO>) request.getAttribute("bills"); %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Bills</title>
    <link rel="stylesheet" href="css/billList.css">
</head>
<body>
<div class="bills-container">
    <h2 class="page-title">🧾 Your Bills</h2>

    <% for (BillDTO bill : bills) { %>
    <div class="bill-card">
        <div class="bill-header">
            <div class="bill-total">
                <span class="total-label">Bill Total:</span>
                <span class="total-amount">LKR <%= bill.getTotalAmount() %></span>
            </div>
            <p class="bill-date">🗓 Created On: <%= bill.getCreatedAt() %></p>
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
                    <td><%= item.getBook().getTitle() %></td>
                    <td><%= item.getQuantity() %></td>
                    <td>LKR <%= item.getPrice() %></td>
                    <td>LKR <%= item.getPrice() * item.getQuantity() %></td>
                </tr>
                <% } %>
                </tbody>
            </table>
        </div>
    </div>
    <% } %>
</div>
</body>
</html>
