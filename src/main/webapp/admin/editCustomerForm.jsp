
<%@ page import="servlet.pahanaedu.user.dto.UserDTO" %>
<%
    UserDTO user = (UserDTO) request.getAttribute("user");
    if (user == null) {
        response.sendRedirect("customers.jsp");
        return;
    }
%>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Customer</title>
    <link rel="stylesheet" href="css/editCustomerForm.css">
</head>
<body>


<form action="updateCustomer" method="post">
    <h2>Edit Customer</h2>
    <input type="hidden" name="id" value="<%= user.getId() %>" />

    Name: <input type="text" name="name" value="<%= user.getName() %>" required><br>
    NIC: <input type="text" name="nic" value="<%= user.getNic() %>" required><br>
    Email: <input type="email" name="email" value="<%= user.getEmail() %>" required><br>
    Contact: <input type="text" name="contact" value="<%= user.getContactNumber() %>" required><br>
    Address: <input type="text" name="address" value="<%= user.getAddress() %>" required><br>

    <button type="submit">Update</button>
</form>
</body>
</html>
