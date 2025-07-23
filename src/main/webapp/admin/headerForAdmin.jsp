<%@ page session="true" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<link rel="stylesheet" href="../css/header.css">
<script src="../js/home.js" defer></script>


<header>
    <nav class="navbar">
        <div class="logo">📚 Pahana Edu</div>
        <ul class="nav-links" id="nav-links">
            <li><a href="../index.jsp">Home</a></li>
            <li><a href="../login.jsp">Login</a></li>
            <li><a href="../register.jsp">Register</a></li>
            <li><a href="../help.jsp">Help</a></li>
        </ul>
        <div class="menu-icon" onclick="toggleMenu()">☰</div>
    </nav>
</header>
