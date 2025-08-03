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

      <!-- Books Card -->
      <div class="dashboard-card books-card">
        <div class="card-icon">
          📚
        </div>
        <h3 class="card-title">Browse Books</h3>
        <p class="card-description">
          Explore our extensive collection of educational books and learning materials.
        </p>
        <a href="<%= request.getContextPath() %>/books" class="card-action">
          <span>Browse Books</span>
          <span class="action-arrow">→</span>
        </a>
        <div class="card-stats">
          <div class="stat-item">
            <span class="stat-label">Available</span>
            <span class="stat-value">1000+</span>
          </div>
        </div>
      </div>

      <!-- Support Card -->
      <div class="dashboard-card support-card">
        <div class="card-icon">
          💬
        </div>
        <h3 class="card-title">Help & Support</h3>
        <p class="card-description">
          Get assistance with your account, billing questions, or technical support.
        </p>
        <a href="<%= request.getContextPath() %>/support" class="card-action">
          <span>Get Help</span>
          <span class="action-arrow">→</span>
        </a>
        <div class="card-stats">
          <div class="stat-item">
            <span class="stat-label">Response</span>
            <span class="stat-value">24/7</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions Section -->
    <div class="quick-actions">
      <h2 class="section-title">Quick Actions</h2>
      <div class="actions-grid">
        <button class="quick-action-btn" onclick="window.location.href='new-order'">
          <span class="action-icon">🛒</span>
          <span>New Order</span>
        </button>
        <button class="quick-action-btn" onclick="window.location.href='order-history'">
          <span class="action-icon">📋</span>
          <span>Order History</span>
        </button>
        <button class="quick-action-btn" onclick="window.location.href='settings'">
          <span class="action-icon">⚙️</span>
          <span>Settings</span>
        </button>
        <button class="quick-action-btn" onclick="showNotifications()">
          <span class="action-icon">🔔</span>
          <span>Notifications</span>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Dashboard specific JavaScript -->
<script src="js/dashboard.js"></script>
</body>
</html>