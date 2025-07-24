<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="servlet.pahanaedu.model.Book" %>
<%@ page import="servlet.pahanaedu.model.Category" %>
<%
    List<Book> books = (List<Book>) request.getAttribute("books");
    List<Category> categories = (List<Category>) request.getAttribute("categories");
    String successMessage = (String) session.getAttribute("successMessage");
    String errorMessage = (String) session.getAttribute("errorMessage");
    session.removeAttribute("successMessage");
    session.removeAttribute("errorMessage");
%>

<!DOCTYPE html>
<html>
<head><title>Manage Books</title>
    <link rel="stylesheet" href="css/manageBook.css">
    <script src="js/manageBook.js" defer></script>
</head>
<body>
<input type="hidden" id="successMessage" value="<%= successMessage != null ? successMessage : "" %>">
<input type="hidden" id="errorMessage" value="<%= errorMessage != null ? errorMessage : "" %>">

<h2>Add New Book</h2>
<form action="manageBook" method="post">
    <input type="hidden" name="action" value="add">

    Title: <input type="text" name="title" required><br><br>
    Author: <input type="text" name="author" required><br><br>
    Category:
    <select name="categoryId" required>
        <option value="">-- Select --</option>
        <% for (Category cat : categories) { %>
        <option value="<%= cat.getId() %>"><%= cat.getName() %>
        </option>
        <% } %>
    </select><br><br>
    Price: <input type="number" name="price" step="0.01" required><br><br>
    Quantity: <input type="number" name="quantity" min="0" required><br><br>

    <button type="submit">Add Book</button>

</form>
<h2>Book List</h2>
<table border="1" cellpadding="8">
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Actions</th>
    </tr>
    <% if (books != null) {
        for (Book book : books) {
    %>
    <tr>
        <td><%= book.getId() %>
        </td>
        <td><%= book.getTitle() %>
        </td>
        <td><%= book.getAuthor() %>
        </td>
        <td><%= book.getCategoryId() %>
        </td>
        <td><%= book.getPrice() %>
        </td>
        <td><%= book.getQuantity() %>
        </td>
        <td>
            <form action="manageBook" method="post" onsubmit="return confirmDelete();" style="display:inline;">
                <input type="hidden" name="action" value="delete">
                <input type="hidden" name="id" value="<%= book.getId() %>">
                <button type="submit">Delete</button>
            </form>
            <form action="manageBook" method="get" style="display:inline;">
                <input type="hidden" name="edit" value="<%= book.getId() %>">
                <button type="submit">Edit</button>
            </form>

        </td>
    </tr>
    <% }
    }
    %>
</table>
</body>
</html>