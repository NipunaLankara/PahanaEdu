<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page session="true" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pahana Edu Bookshop</title>
    <link rel="stylesheet" href="css/home.css">
    <script src="js/home.js" defer></script>
</head>
<body>

<jsp:include page="components/header.jsp" />

<section class="hero">
    <div class="hero-text">
        <h1>Welcome to Pahana Edu Bookshop</h1>
        <p>Your trusted bookshop in Colombo for customer and billing management.</p>
        <div class="hero-buttons">
            <a href="login.jsp" class="btn">Login</a>
            <a href="register.jsp" class="btn btn-secondary">Register</a>
        </div>
    </div>
</section>

<section class="features">
    <h2>Why Choose Us?</h2>
    <div class="feature-cards">
        <div class="card">
            <h3>Customer Management</h3>
            <p>Register and manage customer accounts efficiently.</p>
        </div>
        <div class="card">
            <h3>Item Handling</h3>
            <p>Add, update and delete book and item records.</p>
        </div>
        <div class="card">
            <h3>Billing System</h3>
            <p>Generate accurate bills based on item units.</p>
        </div>
    </div>
</section>

<footer>
    <p>&copy; 2025 Pahana Edu Bookshop. Designed with ❤️ in Sri Lanka.</p>
</footer>

</body>
</html>
