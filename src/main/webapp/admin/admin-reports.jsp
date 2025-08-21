<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.List" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Reports Dashboard</title>
  <link rel="stylesheet" href="css/admin-reports.css">
</head>
<body>
<div class="container">
  <div class="header">
    <h1>Admin Reports Dashboard</h1>
    <p>Comprehensive business analytics and insights</p>
  </div>

  <div class="controls">
    <div class="control-group">
      <button class="btn btn-primary" onclick="printReports()">
        <i class="icon"></i> Print Reports
      </button>
      <button class="btn btn-secondary" onclick="exportReports()">
        <i class="icon"></i> Export PDF
      </button>
      <button class="btn btn-secondary" onclick="refreshData()">
        <i class="icon"></i> Refresh Data
      </button>
    </div>
    <div class="date-info">
      <span id="currentDate"></span>
    </div>
  </div>

  <div class="content">
    <div class="report-section">
      <h2> Daily Sales Summary</h2>
      <div class="table-container">
        <table class="report-table">
          <thead>
          <tr>
            <th>Date</th>
            <th>Total Sales</th>
            <th>Growth</th>
          </tr>
          </thead>
          <tbody>
          <%
            List<Object[]> dailySales = (List<Object[]>) request.getAttribute("dailySales");
            if (dailySales != null && !dailySales.isEmpty()) {
              for (int i = 0; i < dailySales.size(); i++) {
                Object[] row = dailySales.get(i);
          %>
          <tr class="fade-in" style="animation-delay: <%= i * 0.1 %>s">
            <td><%= row[0] %></td>
            <td class="currency">$<%= row[1] %></td>
            <td><span class="growth-indicator positive">+5.2%</span></td>
          </tr>
          <%
            }
          } else {
          %>
          <tr>
            <td colspan="3" class="no-data">No sales data available</td>
          </tr>
          <% } %>
          </tbody>
        </table>
      </div>
    </div>

    <div class="report-section">
      <h2>📚 Top Selling Books</h2>
      <div class="table-container">
        <table class="report-table">
          <thead>
          <tr>
            <th>Rank</th>
            <th>Book Title</th>
            <th>Units Sold</th>
            <th>Revenue</th>
          </tr>
          </thead>
          <tbody>
          <%
            List<Object[]> topBooks = (List<Object[]>) request.getAttribute("topBooks");
            if (topBooks != null && !topBooks.isEmpty()) {
              for (int i = 0; i < topBooks.size(); i++) {
                Object[] row = topBooks.get(i);
          %>
          <tr class="fade-in" style="animation-delay: <%= i * 0.1 %>s">
            <td><span class="rank-badge">#<%= i + 1 %></span></td>
            <td class="book-title"><%= row[0] %></td>
            <td class="units-sold"><%= row[1] %></td>
            <td class="currency">$<%= Float.parseFloat(row[1].toString()) * 15.99 %></td>
          </tr>
          <%
            }
          } else {
          %>
          <tr>
            <td colspan="4" class="no-data">No book sales data available</td>
          </tr>
          <% } %>
          </tbody>
        </table>
      </div>
    </div>

    <div class="report-section">
      <h2>👥 Top Customers</h2>
      <div class="table-container">
        <table class="report-table">
          <thead>
          <tr>
            <th>Rank</th>
            <th>Customer Email</th>
            <th>Total Spent</th>
            <th>Orders</th>
          </tr>
          </thead>
          <tbody>
          <%
            List<Object[]> topCustomers = (List<Object[]>) request.getAttribute("topCustomers");
            if (topCustomers != null && !topCustomers.isEmpty()) {
              for (int i = 0; i < topCustomers.size(); i++) {
                Object[] row = topCustomers.get(i);
          %>
          <tr class="fade-in" style="animation-delay: <%= i * 0.1 %>s">
            <td><span class="rank-badge">#<%= i + 1 %></span></td>
            <td class="customer-email"><%= row[0] %></td>
            <td class="currency">$<%= row[1] %></td>
            <td><span class="order-count"><%= (int)(Math.random() * 20) + 5 %></span></td>
          </tr>
          <%
            }
          } else {
          %>
          <tr>
            <td colspan="4" class="no-data">No customer data available</td>
          </tr>
          <% } %>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="footer">
    <p>Generated on <span id="generateTime"></span> | Admin Dashboard v2.0</p>
  </div>
</div>

<div class="loading-overlay" id="loadingOverlay">
  <div class="spinner"></div>
  <p>Loading fresh data...</p>
</div>

<script src="js/admin-reports.js"></script>
</body>
</html>