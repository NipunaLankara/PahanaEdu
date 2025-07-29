<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="servlet.pahanaedu.user.dto.UserDTO" %>
<%
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    response.setHeader("Pragma", "no-cache");
    response.setDateHeader("Expires", 0);

    UserDTO loggedInUser = (UserDTO) session.getAttribute("loggedInUser");
    if (loggedInUser == null || !"ADMIN".equalsIgnoreCase(loggedInUser.getRole())) {
        response.sendRedirect("../login.jsp");
        return;
    }
%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Dashboard</title>
    <link rel="stylesheet" href="css/adminDashboard.css">

</head>
<body>
<div class="admin-container">
    <jsp:include page="sideBar.jsp" />

    <!-- Main Content -->
    <main class="main-content">
        <!-- Header -->
        <div class="header">
            <h1>Welcome Admin</h1>
            <div class="user-info">
                <span>Hello, Administrator</span>
                <div class="user-avatar">A</div>
            </div>
        </div>

        <!-- Dashboard Cards -->
        <div class="dashboard-cards">
            <div class="card" onclick="location.href='customers.jsp'">
                <div class="card-header">
                    <div class="card-icon customers">👥</div>
                    <div>
                        <div class="card-title">Customers</div>
                        <div class="card-subtitle">Total registered users</div>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-number">1,247</div>
                    <div class="card-trend">+12%</div>
                </div>
            </div>

            <div class="card" onclick="location.href='manageCategory'">
                <div class="card-header">
                    <div class="card-icon categories">📂</div>
                    <div>
                        <div class="card-title">Categories</div>
                        <div class="card-subtitle">Book categories</div>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-number">24</div>
                    <div class="card-trend">+3%</div>
                </div>
            </div>

            <div class="card" onclick="location.href='manageBook'">
                <div class="card-header">
                    <div class="card-icon books">📚</div>
                    <div>
                        <div class="card-title">Books</div>
                        <div class="card-subtitle">Total inventory</div>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-number">3,892</div>
                    <div class="card-trend">+8%</div>
                </div>
            </div>

            <div class="card" onclick="location.href='viewSales.jsp'">
                <div class="card-header">
                    <div class="card-icon sales">💰</div>
                    <div>
                        <div class="card-title">Sales</div>
                        <div class="card-subtitle">This month</div>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-number">Rs.12,450</div>
                    <div class="card-trend">+15%</div>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
            <h3>Quick Actions</h3>
            <div class="action-buttons">
                <a href="customers.jsp" class="action-btn">Add New Customer</a>
                <a href="manageCategory" class="action-btn">Add New Category</a>
                <a href="manageBook" class="action-btn">Add New Book</a>
                <a href="generateReport.jsp" class="action-btn">Generate Report</a>
            </div>
        </div>
    </main>
</div>

<script>
    // Add active class to current page
    document.addEventListener('DOMContentLoaded', function() {
        const currentPage = window.location.pathname.split('/').pop();
        const menuLinks = document.querySelectorAll('.sidebar-menu a');

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    });

    // Add click animations
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
</script>
</body>
</html>