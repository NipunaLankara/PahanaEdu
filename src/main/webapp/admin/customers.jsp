<%@ page import="java.util.List" %>
<%@ page import="servlet.pahanaedu.model.User" %>

<!DOCTYPE html>


<html>
<head>
    <meta charset="UTF-8">
    <title>Customer List</title>

    <!-- Link to CSS -->
    <link rel="stylesheet" href="css/customers.css">

    <!-- Link to JS -->
    <script src="js/customers.js" defer></script>
</head>
<body>

<jsp:include page="headerForAdmin.jsp" />
<h2>All Customers</h2>



<table class="customer-table">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>NIC</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Address</th>
        <th>Role</th>
        <th>Actions</th>
    </tr>
    <%
        if (request.getAttribute("customerList") == null) {
            response.sendRedirect("customers"); // redirect if attribute is missing
            return;
        }

        List<User> customers = (List<User>) request.getAttribute("customerList");
    %>


    <%
        if (customers != null && !customers.isEmpty()) {
            for (User user : customers) {
    %>
    <tr>
        <td><%= user.getId() %></td>
        <td><%= user.getName() %></td>
        <td><%= user.getNic() %></td>
        <td><%= user.getEmail() %></td>
        <td><%= user.getContactNumber() %></td>
        <td><%= user.getAddress() %></td>
        <td><%= user.getRole() %></td>
        <td>
            <a href="editCustomer?id=<%= user.getId() %>" class="edit-btn">Edit</a>|
            <a href="deleteUser?id=<%= user.getId() %>" class="delete-btn">Delete</a>
        </td>
    </tr>
    <%
        }
    } else {
    %>
    <tr>
        <td colspan="8">No customers found.</td>
    </tr>
    <%
        }
    %>
</table>
</body>
</html>
