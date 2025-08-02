<%@ page import="java.util.List" %>
<%@ page import="servlet.pahanaedu.bill.dto.BillDTO" %>
<%@ page import="servlet.pahanaedu.bill.dto.BuyBookDTO" %>
<%@ page import="servlet.pahanaedu.user.dto.UserDTO" %>

<%
  List<BillDTO> bills = (List<BillDTO>) request.getAttribute("bills");
%>

<h2>🧾 All Bills</h2>
<% for (BillDTO bill : bills) {
  UserDTO customer = bill.getCustomer();
%>
<hr>
<p><strong>Bill Total:</strong> LKR <%= bill.getTotalAmount() %></p>
<% if (customer != null) { %>
<p><strong>Customer:</strong> <%= customer.getName() %> (<%= customer.getEmail() %>)</p>
<% } else { %>
<p><strong>Customer:</strong> Unknown</p>
<% } %>

<table border="1">
  <tr>
    <th>Book Title</th>
    <th>Quantity</th>
    <th>Unit Price</th>
    <th>Subtotal</th>
  </tr>
  <% for (BuyBookDTO item : bill.getItems()) { %>
  <tr>
    <td><%= item.getBook().getTitle() %></td>
    <td><%= item.getQuantity() %></td>
    <td>LKR <%= item.getPrice() %></td>
    <td>LKR <%= item.getPrice() * item.getQuantity() %></td>
  </tr>
  <% } %>
</table>
<% } %>
