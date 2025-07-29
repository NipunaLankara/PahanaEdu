<%--
  Created by IntelliJ IDEA.
  User: DELL
  Date: 7/25/2025
  Time: 9:28 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<link rel="stylesheet" href="css/sideBar.css">

<body>


<!-- Sidebar -->
<nav class="sidebar">
    <div class="sidebar-header">
        <h2>Admin Panel</h2>
        <p>Management System</p>
    </div>
    <ul class="sidebar-menu">
        <li>
            <a href="#" class="active">
                <span class="icon">📊</span>
                <span>Dashboard</span>
            </a>
        </li>
        <li>
            <a href="customers.jsp">
                <span class="icon">👥</span>
                <span>Manage Customers</span>
            </a>
        </li>
        <li>
            <a href="manageCategory">
                <span class="icon">📂</span>
                <span>Manage Categories</span>
            </a>
        </li>
        <li>
            <a href="manageBook">
                <span class="icon">📚</span>
                <span>Manage Books</span>
            </a>
        </li>
        <li>
            <a href="viewSales.jsp">
                <span class="icon">💰</span>
                <span>View Selling Details</span>
            </a>
        </li>
        <li>
            <a href="settings.jsp">
                <span class="icon">⚙️</span>
                <span>Settings</span>
            </a>
        </li>
        <li>
            <a href="../logout.jsp">
                <span class="icon">🚪</span>
                <span>Logout</span>
            </a>
        </li>
    </ul>
</nav>

</body>
</html>
