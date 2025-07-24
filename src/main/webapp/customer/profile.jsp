<%@ page import="servlet.pahanaedu.model.User" %>
<%
  User customer = (User) session.getAttribute("loggedInUser");
  if (customer == null || !"CUSTOMER".equalsIgnoreCase(customer.getRole())) {
    response.sendRedirect("../login.jsp");
    return;
  }
  request.setAttribute("customer", customer);
%>

<h2>Edit Profile</h2>

<form action="updateProfile" method="post">
  <input type="hidden" name="id" value="<%= customer.getId() %>" />

  Name: <input type="text" name="name" value="<%= customer.getName() %>" required /><br><br>
  NIC: <input type="text" name="nic" value="<%= customer.getNic() %>" required /><br><br>
  Email: <input type="email" name="email" value="<%= customer.getEmail() %>" required /><br><br>
  Contact: <input type="text" name="contact" value="<%= customer.getContactNumber() %>" required /><br><br>
  Address: <input type="text" name="address" value="<%= customer.getAddress() %>" required /><br><br>

  <button type="submit">Update</button>
</form>

