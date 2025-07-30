<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="javax.servlet.http.HttpSession" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bill Result</title>
  <link rel="stylesheet" href="css/billResult.css">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
<div class="background-animation">
  <div class="floating-circle circle-1"></div>
  <div class="floating-circle circle-2"></div>
  <div class="floating-circle circle-3"></div>
  <div class="floating-circle circle-4"></div>
</div>

<div class="container">
  <div class="result-card">
    <!-- Status Icon -->
    <div class="status-icon">
      <c:choose>
        <c:when test="${not empty message}">
          <div class="icon-wrapper success">
            <i class="fas fa-check-circle"></i>
          </div>
        </c:when>
        <c:when test="${not empty error}">
          <div class="icon-wrapper error">
            <i class="fas fa-exclamation-circle"></i>
          </div>
        </c:when>
        <c:otherwise>
          <div class="icon-wrapper warning">
            <i class="fas fa-question-circle"></i>
          </div>
        </c:otherwise>
      </c:choose>
    </div>

    <!-- Result Message -->
    <div class="message-section">
      <h1 class="title">
        <c:choose>
          <c:when test="${not empty message}">
            Bill Creation Result
          </c:when>
          <c:when test="${not empty error}">
            Error Occurred
          </c:when>
          <c:otherwise>
            Unknown Status
          </c:otherwise>
        </c:choose>
      </h1>

      <div class="message-content">
        <c:choose>
          <c:when test="${not empty message}">
            <p class="success-message">${message}</p>
          </c:when>
          <c:when test="${not empty error}">
            <p class="error-message">${error}</p>
          </c:when>
          <c:otherwise>
            <p class="warning-message">Unknown status occurred.</p>
          </c:otherwise>
        </c:choose>
      </div>
    </div>

    <!-- Additional Information -->
    <div class="info-section">
      <div class="info-item">
        <i class="fas fa-clock"></i>
        <span>Processed at: <span id="currentTime"></span></span>
      </div>

      <c:if test="${not empty message}">
        <div class="info-item">
          <i class="fas fa-receipt"></i>
          <span>Bill has been successfully created</span>
        </div>
      </c:if>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <a href="${pageContext.request.contextPath}/admin/create-bill.jsp" class="btn primary">
        <i class="fas fa-plus"></i>
        Create New Bill
      </a>

      <a href="${pageContext.request.contextPath}/admin/dashboard.jsp" class="btn secondary">
        <i class="fas fa-home"></i>
        Dashboard
      </a>

      <c:if test="${not empty message}">
        <button class="btn tertiary" onclick="printReceipt()">
          <i class="fas fa-print"></i>
          Print Receipt
        </button>
      </c:if>
    </div>

    <!-- Progress Bar for Auto-redirect -->
    <div class="auto-redirect" id="autoRedirect">
      <p>Redirecting to dashboard in <span id="countdown">10</span> seconds...</p>
      <div class="progress-bar">
        <div class="progress-fill" id="progressFill"></div>
      </div>
      <button class="cancel-redirect" onclick="cancelRedirect()">
        <i class="fas fa-times"></i>
        Cancel
      </button>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>&copy; 2025 Bookstore Management System</p>
  </div>
</div>

<script src="js/billResult.js"></script>
</body>
</html>