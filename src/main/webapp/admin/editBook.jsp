<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="servlet.pahanaedu.model.Book" %>
<%@ page import="servlet.pahanaedu.model.Category" %>
<%
    Book book = (Book) request.getAttribute("book");
    List<Category> categories = (List<Category>) request.getAttribute("categories");
    String successMessage = (String) session.getAttribute("successMessage");
    String errorMessage = (String) session.getAttribute("errorMessage");
    session.removeAttribute("successMessage");
    session.removeAttribute("errorMessage");
%>
<!DOCTYPE html>
<html>
<head>
    <title>Edit Book</title>
    <link rel="stylesheet" href="css/manageBook.css">
    <script src="js/manageBook.js" defer></script>
</head>
<body>

<input type="hidden" id="successMessage" value="<%= successMessage != null ? successMessage : "" %>">
<input type="hidden" id="errorMessage" value="<%= errorMessage != null ? errorMessage : "" %>">

<h2>Edit Book</h2>
<% if (book != null) { %>
<form action="manageBook" method="post">
    <input type="hidden" name="action" value="update">
    <input type="hidden" name="id" value="<%= book.getId() %>">

    Title: <input type="text" name="title" value="<%= book.getTitle() %>" required><br><br>
    Author: <input type="text" name="author" value="<%= book.getAuthor() %>" required><br><br>
    Category:
    <select name="categoryId" required>
        <option value="">-- Select --</option>
        <% for (Category cat : categories) { %>
        <option value="<%= cat.getId() %>" <%= cat.getId() == book.getCategoryId() ? "selected" : "" %>>
            <%= cat.getName() %>
        </option>
        <% } %>
    </select><br><br>
    Price: <input type="number" name="price" step="0.01" value="<%= book.getPrice() %>" required><br><br>
    Quantity: <input type="number" name="quantity" min="0" value="<%= book.getQuantity() %>" required><br><br>

    <button type="submit">Update Book</button>
    <a href="manageBook">Cancel</a>
</form>
<% } else { %>
<p>Book not found.</p>
<% } %>

</body>
</html>
