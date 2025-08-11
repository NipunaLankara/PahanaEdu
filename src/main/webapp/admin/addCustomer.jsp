<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New Customer</title>
    <link rel="stylesheet" href="css/addCustomer.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>

<jsp:include page="headerForAdmin.jsp" />
<body>
<div class="container">
    <div class="form-wrapper">
        <div class="form-header">
            <i class="fas fa-user-plus"></i>
            <h2>Add New Customer</h2>
        </div>

        <form id="customerForm" action="addCustomer" method="post">
            <% String errorMessage = (String) request.getAttribute("errorMessage"); %>
            <% if (errorMessage != null) { %>
            <div style="color: red; margin-bottom: 15px; text-align: center;">
                <%= errorMessage %>
            </div>
            <% } %>
            <div class="form-group">
                <label for="name">
                    <i class="fas fa-user"></i>
                    Full Name
                </label>
                <input type="text" id="name" name="name" required>
                <span class="error-message" id="nameError"></span>
            </div>

            <div class="form-group">
                <label for="address">
                    <i class="fas fa-home"></i>
                    Address
                </label>
                <input type="text" id="address" name="address" required>
                <span class="error-message" id="addressError"></span>
            </div>

            <div class="form-group">
                <label for="email">
                    <i class="fas fa-envelope"></i>
                    Email Address
                </label>
                <input type="email" id="email" name="email" required>
                <span class="error-message" id="emailError"></span>
            </div>

            <div class="form-group">
                <label for="nic">
                    <i class="fas fa-id-card"></i>
                    NIC Number
                </label>
                <input type="text" id="nic" name="nic" required>
                <span class="error-message" id="nicError"></span>
            </div>

            <div class="form-group">
                <label for="contactNumber">
                    <i class="fas fa-phone"></i>
                    Contact Number
                </label>
                <input type="tel" id="contactNumber" name="contactNumber" required>
                <span class="error-message" id="contactError"></span>
            </div>

            <div class="form-group">
                <label for="password">
                    <i class="fas fa-lock"></i>
                    Password
                </label>
                <div class="password-wrapper">
                    <input type="password" id="password" name="password" required>
                    <button type="button" class="toggle-password" onclick="togglePassword('password')">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <span class="error-message" id="passwordError"></span>
                <div class="password-strength" id="passwordStrength"></div>
            </div>

            <div class="form-group">
                <label for="confirmPassword">
                    <i class="fas fa-lock"></i>
                    Confirm Password
                </label>
                <div class="password-wrapper">
                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                    <button type="button" class="toggle-password" onclick="togglePassword('confirmPassword')">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <span class="error-message" id="confirmPasswordError"></span>
            </div>

            <button type="submit" class="submit-btn">
                <i class="fas fa-user-plus"></i>
                Add Customer
            </button>
        </form>

        <c:if test="${not empty error}">
            <div class="message error-msg">
                <i class="fas fa-exclamation-circle"></i>
                    ${error}
            </div>
        </c:if>

        <c:if test="${not empty success}">
            <div class="message success-msg">
                <i class="fas fa-check-circle"></i>
                    ${success}
            </div>
        </c:if>
    </div>
</div>

<script src="js/addCustomer.js"></script>
</body>
</html>

<script>
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === '1') {
        // Show a styled toast message
        const toast = document.createElement("div");
        toast.textContent = "Customer Registered Successfully";
        toast.style.position = "fixed";
        toast.style.top = "20px";
        toast.style.right = "20px";
        toast.style.background = "#4CAF50";
        toast.style.color = "white";
        toast.style.padding = "12px 20px";
        toast.style.borderRadius = "6px";
        toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
        toast.style.zIndex = "1000";
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = "opacity 0.5s ease";
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
</script>
