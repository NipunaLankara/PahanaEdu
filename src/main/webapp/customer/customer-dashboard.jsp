<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="servlet.pahanaedu.user.dto.UserDTO" %>
<%
    UserDTO user = (UserDTO) session.getAttribute("loggedInUser");
    if (user == null) {
        response.sendRedirect("../login.jsp");
        return;
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Dashboard - Pahana Edu</title>

    <!-- Dashboard specific CSS (loaded after header) -->
    <link rel="stylesheet" href="css/dashboard.css">
</head>
<body>
<div class="dashboard-body">
    <!-- Top Navigation Bar with Logout -->
    <div class="dashboard-header">
        <div class="header-content">
            <div class="logo-section">
                <h2>📚 Pahana Edu</h2>
            </div>
            <div class="user-section">
                <div class="user-info-header">
                    <span class="user-name">Hello, <%= user.getName() != null ? user.getName() : "User" %></span>
                    <span class="user-id">#<%= user.getId() %></span>
                </div>
                <div class="logout-section">
                    <a href="<%= request.getContextPath() %>/logout.jsp" class="logout-btn" onclick="confirmLogout(event)">
                        <span class="logout-icon">🚪</span>
                        <span>Logout</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="dashboard-container">
        <!-- Welcome Section -->
        <div class="welcome-section">
            <h1 class="welcome-title">Welcome Back!</h1>
            <div class="user-info">
                <div class="user-badge">
                    📋 Account #<%= user.getId() %>
                </div>
                <div class="user-badge">
                    👋 Hello, <%= user.getName() != null ? user.getName() : "User" %>
                </div>
            </div>
        </div>

        <!-- Dashboard Cards Grid -->
        <div class="dashboard-grid">
            <!-- Profile Card -->
            <div class="dashboard-card profile-card">
                <div class="card-icon">
                    👤
                </div>
                <h3 class="card-title">My Profile</h3>
                <p class="card-description">
                    View and update your personal information, contact details, and account preferences.
                </p>
                <a href="<%= request.getContextPath() %>/customer/profile.jsp" class="card-action">
                    <span>View Profile</span>
                    <span class="action-arrow">→</span>
                </a>
                <div class="card-stats">
                    <div class="stat-item">
                        <span class="stat-label">Status</span>
                        <span class="stat-value active">Active</span>
                    </div>
                </div>
            </div>

            <!-- Bills Card -->
            <div class="dashboard-card bills-card">
                <div class="card-icon">
                    🧾
                </div>
                <h3 class="card-title">My Bills</h3>
                <p class="card-description">
                    Access your billing history, view past transactions, and download receipts.
                </p>
                <a href="my-bills" class="card-action">
                    <span>View Bills</span>
                    <span class="action-arrow">→</span>
                </a>
                <div class="card-stats">
                    <div class="stat-item">
                        <span class="stat-label">Last Bill</span>
                        <span class="stat-value">Recently</span>
                    </div>
                </div>
            </div>




        </div>

        <!-- Quick Actions Section -->
        <div class="quick-actions">
            <h2 class="section-title">Quick Actions</h2>
            <div class="actions-grid">
                <button class="quick-action-btn" onclick="showNotifications()">
                    <span class="action-icon">🔔</span>
                    <span>Notifications</span>
                </button>
                <button class="quick-action-btn" onclick="window.location.href='<%= request.getContextPath() %>/customer/profile.jsp'">
                    <span class="action-icon">⚙️</span>
                    <span>Settings</span>
                </button>
                <button class="quick-action-btn" onclick="window.location.href='<%= request.getContextPath() %>/customer/help.jsp'">
                    <span class="action-icon">❓</span>
                    <span>Help</span>
                </button>
                <button class="quick-action-btn logout-quick-btn" onclick="confirmLogout(event)">
                    <span class="action-icon">🚪</span>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Dashboard specific JavaScript -->
<script src="js/dashboard.js"></script>
<script>
    function confirmLogout(event) {
        event.preventDefault();

        // Show custom confirmation dialog
        const confirmation = confirm('Are you sure you want to logout?');

        if (confirmation) {
            // Add loading effect
            const logoutBtns = document.querySelectorAll('.logout-btn, .logout-quick-btn');
            logoutBtns.forEach(btn => {
                btn.style.opacity = '0.6';
                btn.style.pointerEvents = 'none';
                btn.innerHTML = '<span class="logout-icon">⏳</span><span>Logging out...</span>';
            });

            // Show notification
            if (typeof showNotification === 'function') {
                showNotification('Logging out... See you soon! 👋', 'info');
            }

            // Redirect after short delay
            setTimeout(() => {
                window.location.href = '<%= request.getContextPath() %>/logout.jsp';
            }, 1500);
        }
    }

    // Add logout keyboard shortcut
    document.addEventListener('keydown', function(e) {
        // Ctrl + Alt + L for logout
        if (e.ctrlKey && e.altKey && e.key === 'l') {
            e.preventDefault();
            confirmLogout(e);
        }
    });
</script>
</body>
</html>