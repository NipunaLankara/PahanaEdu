<%@ page import="servlet.pahanaedu.bill.dto.BillDTO" %>
<%@ page import="servlet.pahanaedu.bill.dto.BuyBookDTO" %>
<%@ page import="servlet.pahanaedu.book.dto.BookDTO" %>
<%@ page import="servlet.pahanaedu.user.dto.UserDTO" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page session="true" %>

<%
  BillDTO bill = (BillDTO) request.getAttribute("bill");
  if (bill == null) return;

  UserDTO customer = bill.getCustomer();
%>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Print Bill</title>

  <!-- Main Styles -->
  <link rel="stylesheet" href="css/print.css">
  <link rel="stylesheet" href="../css/header.css">

  <!-- Print-specific styles -->
  <style>
    @media print {
      /* Hide navbar & menu icon in print */
      header, .navbar, .menu-icon {
        display: none !important;
      }
      body {
        background: white !important;
        color: black !important;
      }
      .bill-container {
        margin-top: 0; /* Adjust since header is hidden */
      }
    }
  </style>

  <script src="js/print.js" defer></script>
</head>
<body>

<!-- Include header -->
<jsp:include page="headerForAdmin.jsp" />

<div class="bill-container">
  <h2>Pahana Book Shop - Bill</h2>
  <hr>
  <p><strong>Customer ID:</strong> <%= customer.getId() %></p>
  <p><strong>Name:</strong> <%= customer.getName() %></p>
  <p><strong>Email:</strong> <%= customer.getEmail() %></p>
  <p><strong>Contact Number:</strong> <%= customer.getContactNumber() %></p>

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
      <td>Rs. <%= item.getPrice() %></td>
      <td><%= item.getQuantity() %></td>
      <td>Rs. <%= subtotal %></td>
    </tr>
    <% } %>
    </tbody>
  </table>
  <h3 style="text-align: right;">Total: Rs. <%= bill.getTotalAmount() %></h3>
</div>

</body>
</html>
