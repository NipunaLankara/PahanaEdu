<%@ page import="servlet.pahanaedu.bill.dto.BillDTO" %>
<%@ page import="servlet.pahanaedu.bill.dto.BuyBookDTO" %>
<%@ page import="servlet.pahanaedu.book.dto.BookDTO" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%
  BillDTO bill = (BillDTO) request.getAttribute("bill");
  if (bill == null) return;
%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Print Bill</title>
  <link rel="stylesheet" href="css/print.css">
  <script>
    window.onload = function () {
      window.print(); // Automatically opens print dialog
    }
  </script>
</head>
<body>
<div class="bill-container">
  <h2>📚 Pahana Book Shop - Bill</h2>
  <hr>
  <p><strong>Customer ID:</strong> <%= bill.getCustomerId() %></p>
  <table border="1" width="100%" cellpadding="10" cellspacing="0">
    <thead>
    <tr>
      <th>Book Title</th>
      <th>Author</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Subtotal</th>
    </tr>
    </thead>
    <tbody>
    <% for (BuyBookDTO item : bill.getItems()) {
      BookDTO book = item.getBook();
      double subtotal = item.getQuantity() * item.getPrice();
    %>
    <tr>
      <td><%= book.getTitle() %></td>
      <td><%= book.getAuthor() %></td>
      <td><%= item.getPrice() %></td>
      <td><%= item.getQuantity() %></td>
      <td><%= subtotal %></td>
    </tr>
    <% } %>
    </tbody>
  </table>
  <h3 style="text-align: right;">Total: Rs. <%= bill.getTotalAmount() %></h3>
</div>
</body>

</html>

<script src="js/print.js"></script>
