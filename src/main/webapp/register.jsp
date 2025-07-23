
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="css/register.css">
</head>

<%@include file="components/header.jsp"%>
<body>


<div class="register-container">
    <h1>Register</h1>

    <form action="register" method="post">
        <% String errorMessage = (String) request.getAttribute("errorMessage"); %>
        <% if (errorMessage != null) { %>
        <div style="color: red; margin-bottom: 15px; text-align: center;">
            <%= errorMessage %>
        </div>
        <% } %>

        <label for="name">Full Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your full name" required>

        <label for="address">Address</label>
        <input type="text" id="address" name="address" placeholder="Enter your address" required>

        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required>

        <label for="nic">NIC</label>
        <input type="text" id="nic" name="nic" placeholder="Enter your NIC" required>

        <label for="phoneNumber">Phone Number</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" required>

        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter Password" required>

        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter Confirm Password" required>


        <button type="submit">Register</button>
    </form>

    <div class="footer">
        <p>Already have an account? <a href="login.jsp">Login</a></p>
    </div>
</div>
</div>
</body>
</html>
