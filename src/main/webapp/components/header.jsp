<%@ page session="true" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<link rel="stylesheet" href="css/header.css">


<header>
    <nav class="navbar">
        <div class="logo">Pahana Edu</div>
        <ul class="nav-links" id="nav-links">
            <li><a href="index.jsp">Home</a></li>
            <li><a href="register.jsp">Register</a></li>


            <%
                HttpSession userSession = request.getSession(false);
                String userEmail = (userSession != null) ? (String) userSession.getAttribute("email") : null;

                if (userEmail != null) {
            %>
            <a href="logout.jsp">
                <button class="logout">Logout</button>
            </a>
            <% } else { %>
            <a href="login.jsp">
                <button class="login">Login</button>
            </a>
            <% } %>

        </ul>
        <div class="menu-icon" onclick="toggleMenu()">☰</div>
    </nav>
</header>


<script>
    function toggleMenu() {
        const navLinks = document.getElementById("nav-links");
        navLinks.classList.toggle("active");
    }
</script>
