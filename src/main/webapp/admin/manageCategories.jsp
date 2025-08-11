<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="servlet.pahanaedu.category.dto.CategoryDTO" %>
<%

    String successMessage = (String) session.getAttribute("successMessage");
    String errorMessage = (String) session.getAttribute("errorMessage");
    session.removeAttribute("successMessage");
    session.removeAttribute("errorMessage");


    List<CategoryDTO> categories = (List<CategoryDTO>) request.getAttribute("categories");
    if (categories != null) {
        for (CategoryDTO c : categories) {
%>
<%
        }
    }
%>

<!DOCTYPE html>
<html>
<head>
    <title>Manage Categories</title>
    <link rel="stylesheet" type="text/css" href="css/manageCategories.css">
    <script src="js/manageCategories.js" defer></script>
</head>
<body>

<jsp:include page="headerForAdmin.jsp" />

<input type="hidden" id="successMessage" value="<%= successMessage != null ? successMessage : "" %>">
<input type="hidden" id="errorMessage" value="<%= errorMessage != null ? errorMessage : "" %>">

<h2>Add Category</h2>
<form id="categoryForm" action="manageCategory" method="post">
    <input type="hidden" name="action" value="add"/>
    Name: <input type="text" id="name" name="name" required/>
    Description: <input type="text" id="description" name="description" required/>
    <button type="submit">Add</button>
</form>

<h2>All Categories</h2>
<table>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Actions</th>
    </tr>


<%--    <%--%>
<%--        if (request.getAttribute("categories") == null) {--%>
<%--            response.sendRedirect("manageCategory"); // redirect if attribute is missing--%>
<%--            return;--%>
<%--        }--%>

<%--        List<Category> categories = (List<Category>) request.getAttribute("categories");--%>
<%--    %>--%>
    <%
        if (categories != null) {
            for (CategoryDTO c : categories) {
    %>
    <tr>
        <td><%= c.getId() %></td>
        <td><%= c.getName() %></td>
        <td><%= c.getDescription() %></td>
        <td>
            <form action="manageCategory" method="post" style="display:inline;">
                <input type="hidden" name="action" value="delete"/>
                <input type="hidden" name="id" value="<%= c.getId() %>"/>
                <button class="delete-btn" type="submit">Delete</button>
            </form>
        </td>
    </tr>
    <%
            }
        }
    %>
</table>

</body>
</html>
