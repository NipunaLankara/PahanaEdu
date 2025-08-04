<%@ page import="servlet.pahanaedu.user.dto.UserDTO" %>
<%
  UserDTO customer = (UserDTO) session.getAttribute("loggedInUser");
  if (customer == null || !"CUSTOMER".equalsIgnoreCase(customer.getRole())) {
    response.sendRedirect("../login.jsp");
    return;
  }
%>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edit Profile - Pahana Edu</title>
  <link rel="stylesheet" href="css/profile.css">
</head>
<body>
<!-- Header -->
<div class="profile-header">
  <div class="header-content">
    <div class="breadcrumb">
      <a href="<%= request.getContextPath() %>/customer/dashboard.jsp" class="breadcrumb-link">
        <span class="breadcrumb-icon">🏠</span>
        <span>Dashboard</span>
      </a>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-current">Edit Profile</span>
    </div>
    <div class="user-info">
      <div class="user-avatar">
        <span class="avatar-text"><%= customer.getName().substring(0, 1).toUpperCase() %></span>
      </div>
      <div class="user-details">
        <span class="user-name"><%= customer.getName() %></span>
        <span class="user-id">ID: <%= customer.getId() %></span>
      </div>
    </div>
  </div>
</div>

<!-- Main Content -->
<div class="profile-container">
  <div class="profile-card">
    <!-- Card Header -->
    <div class="card-header">
      <div class="header-icon">
        <span class="icon">👤</span>
      </div>
      <div class="header-text">
        <h2 class="card-title">Edit Profile</h2>
        <p class="card-subtitle">Update your personal information and account details</p>
      </div>
    </div>

    <!-- Progress Indicator -->
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" id="progressFill"></div>
      </div>
      <span class="progress-text" id="progressText">Complete your profile (0/6)</span>
    </div>

    <!-- Profile Form -->
    <form id="profileForm" action="updateProfile" method="post" class="profile-form">
      <input type="hidden" name="id" value="<%= customer.getId() %>" />

      <!-- Form Grid -->
      <div class="form-grid">
        <!-- Name Field -->
        <div class="form-group">
          <label class="form-label" for="name">
            <span class="label-icon"></span>
            <span class="label-text">Full Name</span>
            <span class="required">*</span>
          </label>
          <div class="input-container">
            <input type="text"
                   id="name"
                   name="name"
                   class="form-input"
                   value="<%= customer.getName() != null ? customer.getName() : "" %>"
                   required
                   placeholder="Enter your full name"
                   data-tooltip="Enter your complete legal name" />
            <div class="input-icon">👤</div>
            <div class="validation-message" id="nameError"></div>
          </div>
        </div>

        <!-- NIC Field -->
        <div class="form-group">
          <label class="form-label" for="nic">
            <span class="label-icon"></span>
            <span class="label-text">NIC Number</span>
            <span class="required">*</span>
          </label>
          <div class="input-container">
            <input type="text"
                   id="nic"
                   name="nic"
                   class="form-input"
                   value="<%= customer.getNic() != null ? customer.getNic() : "" %>"
                   required
                   placeholder="Enter your NIC number"
                   data-tooltip="Enter your National Identity Card number" />
            <div class="input-icon"></div>
            <div class="validation-message" id="nicError"></div>
          </div>
        </div>

        <!-- Email Field -->
        <div class="form-group">
          <label class="form-label" for="email">
            <span class="label-icon"></span>
            <span class="label-text">Email Address</span>
            <span class="required">*</span>
          </label>
          <div class="input-container">
            <input type="email"
                   id="email"
                   name="email"
                   class="form-input"
                   value="<%= customer.getEmail() != null ? customer.getEmail() : "" %>"
                   required
                   placeholder="Enter your email address"
                   data-tooltip="Enter a valid email address" />
            <div class="input-icon"></div>
            <div class="validation-message" id="emailError"></div>
          </div>
        </div>

        <!-- Contact Field -->
        <div class="form-group">
          <label class="form-label" for="contact">
            <span class="label-icon"></span>
            <span class="label-text">Contact Number</span>
            <span class="required">*</span>
          </label>
          <div class="input-container">
            <input type="tel"
                   id="contact"
                   name="contact"
                   class="form-input"
                   value="<%= customer.getContactNumber() != null ? customer.getContactNumber() : "" %>"
                   required
                   placeholder="Enter your contact number"
                   data-tooltip="Enter your mobile or landline number" />
            <div class="input-icon"></div>
            <div class="validation-message" id="contactError"></div>
          </div>
        </div>

        <!-- Address Field - Full Width -->
        <div class="form-group full-width">
          <label class="form-label" for="address">
            <span class="label-icon"></span>
            <span class="label-text">Address</span>
            <span class="required">*</span>
          </label>
          <div class="input-container">
              <textarea id="address"
                        name="address"
                        class="form-textarea"
                        required
                        placeholder="Enter your complete address"
                        data-tooltip="Enter your full residential address"
                        rows="3"><%= customer.getAddress() != null ? customer.getAddress() : "" %></textarea>
            <div class="input-icon"></div>
            <div class="validation-message" id="addressError"></div>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="goBack()">
          <span class="btn-icon"></span>
          <span class="btn-text">Cancel</span>
        </button>

        <button type="button" class="btn btn-outline" onclick="resetForm()">
          <span class="btn-icon"></span>
          <span class="btn-text">Reset</span>
        </button>

        <button type="submit" class="btn btn-primary" id="submitBtn">
          <span class="btn-icon"></span>
          <span class="btn-text">Update Profile</span>
          <div class="btn-loader" id="btnLoader"></div>
        </button>
      </div>
    </form>

    <!-- Security Info -->
    <div class="security-info">
      <div class="security-icon"></div>
      <div class="security-text">
        <strong>Your information is secure</strong>
        <p>We use industry-standard encryption to protect your personal data.</p>
      </div>
    </div>
  </div>
</div>

<!-- Success/Error Messages -->
<div id="messageContainer" class="message-container"></div>

<!-- Loading Overlay -->
<div id="loadingOverlay" class="loading-overlay">
  <div class="loading-spinner">
    <div class="spinner"></div>
    <p>Updating your profile...</p>
  </div>
</div>

<script src="js/profile.js"></script>
</body>
</html>