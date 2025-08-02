<%@ page import="servlet.pahanaedu.user.dto.UserDTO" %>
<%
  UserDTO customer = (UserDTO) session.getAttribute("loggedInUser");
  if (customer == null || !"CUSTOMER".equalsIgnoreCase(customer.getRole())) {
    response.sendRedirect("../login.jsp");
    return;
  }
%>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Edit Profile</title>
  <link rel="stylesheet" href="css/profile.css">
</head>
<body>

<h2>Edit Profile</h2>

<form action="updateProfile" method="post" onsubmit="return showMessage()">
  <input type="hidden" name="id" value="<%= customer.getId() %>" />

  Name: <input type="text" name="name" value="<%= customer.getName() %>" required /><br><br>
  NIC: <input type="text" name="nic" value="<%= customer.getNic() %>" required /><br><br>
  Email: <input type="email" name="email" value="<%= customer.getEmail() %>" required /><br><br>
  Contact: <input type="text" name="contact" value="<%= customer.getContactNumber() %>" required /><br><br>
  Address: <input type="text" name="address" value="<%= customer.getAddress() %>" required /><br><br>

  <button type="submit">Update</button>
</form>

<script src="js/profile.js"></script>
</body>
</html>
