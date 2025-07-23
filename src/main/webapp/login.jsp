

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="css/login.css">

</head>

<%--<%@include file="components/header.jsp"%>--%>
<body>



<div class="login-container">
    <h1>Login</h1>

    <% String errorMessage = (String) request.getAttribute("errorMessage"); %>
    <% if (errorMessage != null) { %>
    <div style="color: red; margin-bottom: 15px; text-align: center;">
        <%= errorMessage %>
    </div>
    <% } %>

    <div class="content">
        <h2>Login Page</h2>
        <form action="login" method="post">
            <label>Email:</label>
            <input type="email" name="email" required><br>

            <label>Password:</label>
            <input type="password" name="password" required><br>

            <button type="submit">Login</button>
        </form>
    </div>


    <div class="footer">
        <p>Don't have an account? <a href="register.jsp">Sign up</a></p>
    </div>
</div>
</body>
</html>
