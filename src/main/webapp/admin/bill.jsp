<%@ page import="java.util.List" %>
<%@ page import="servlet.pahanaedu.bill.dto.BuyBookDTO" %>
<%@ page import="servlet.pahanaedu.book.dto.BookDTO" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%
    String action = request.getAttribute("action") != null ? (String) request.getAttribute("action") : "confirm";
    String customerEmail = (String) request.getAttribute("customerEmail");
    List<BuyBookDTO> buyBookList = (List<BuyBookDTO>) request.getAttribute("buyBookList");
    Double total = (Double) request.getAttribute("total");
    String message = (String) request.getAttribute("message");
    String error = (String) request.getAttribute("error");
%>
<%
    List<BookDTO> bookList = (List<BookDTO>) request.getAttribute("bookList");
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Create Bill</title>
    <link rel="stylesheet" href="css/bill.css">
</head>
<body>
<div class="container">
    <h2>🧾 Create / Confirm Bill</h2>

    <% if (message != null) { %>
    <div class="message"><%= message %>
    </div>
    <% } %>
    <% if (error != null) { %>
    <div class="error" style="color: red; font-weight: bold; margin-bottom: 10px;">
        <%= error.replaceAll("\\n", "<br/>") %>
    </div>
    <% } %>


    <form method="post" action="bill" id="billForm">
        <input type="hidden" name="action" id="actionInput" value="<%= action %>"/>

        <div class="section">
            <label><strong>Customer Email:</strong></label>
            <input type="email" name="customerEmail" value="<%= customerEmail != null ? customerEmail : "" %>"
                   required/>
            <button type="button" class="btn verify-btn" onclick="submitForm('verify')">Verify Email</button>
        </div>

        <% if (customerEmail != null && error == null) { %>
        <div class="section">
            <label><strong>Book Items:</strong></label>
            <div id="bookInputs">
                <% if (buyBookList == null) { %>
                <div class="form-row">
                    <select name="bookId" required>
                        <option value="">-- Select Book --</option>
                        <% if (bookList != null) {
                            for (BookDTO book : bookList) { %>
                        <option value="<%= book.getId() %>">
                            <%= book.getTitle() %> by <%= book.getAuthor() %> (Rs. <%= book.getPrice() %>)
                        </option>
                        <% }
                        } else { %>
                        <option disabled>No books available</option>
                        <% } %>
                    </select>
                    <input type="number" name="quantity" placeholder="Quantity" required min="1"/>
                </div>
                <% } else {
                    for (BuyBookDTO item : buyBookList) { %>
                <input type="hidden" name="bookId" value="<%= item.getBookId() %>"/>
                <input type="hidden" name="quantity" value="<%= item.getQuantity() %>"/>
                <% }
                } %>
            </div>

            <% if (buyBookList == null) { %>
            <button type="button" class="btn add-btn" onclick="addBookInput()">+ Add Book</button>
            <% } %>
        </div>

        <% if (buyBookList != null && !buyBookList.isEmpty()) { %>
        <div class="section">
            <table>
                <thead>
                <tr>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>
                <% for (BuyBookDTO item : buyBookList) {
                    BookDTO book = item.getBook();
                    double subtotal = item.getPrice() * item.getQuantity(); %>
                <tr>
                    <td><%= book.getTitle() %>
                    </td>
                    <td><%= book.getAuthor() %>
                    </td>
                    <td><%= item.getPrice() %>
                    </td>
                    <td><%= item.getQuantity() %>
                    </td>
                    <td><%= subtotal %>
                    </td>
                </tr>
                <% } %>
                </tbody>
            </table>
            <div style="text-align: right; margin-top: 10px;">
                <strong>Total: Rs. <%= total != null ? total : 0.0 %>
                </strong>
            </div>
        </div>
        <% } %>

        <div class="section">
            <% if (buyBookList != null && "create".equals(action)) { %>
            <button type="submit" class="btn submit-btn" onclick="setAction('create')">Place Bill</button>
            <% } else if ("confirm".equals(action)) { %>
            <button type="submit" class="btn submit-btn" onclick="setAction('confirm')">Confirm Bill</button>
            <% } %>
        </div>
        <% } %> <!-- End of if email verified -->
    </form>

</div>


<%--<script src="js/bill.js"></script>--%>

<script>
    function setAction(actionValue) {
        document.getElementById('actionInput').value = actionValue;
    }

    function addBookInput() {
        const container = document.getElementById("bookInputs");
        const div = document.createElement("div");
        div.className = "form-row";
        div.innerHTML = `
<select name="bookId" required>
    <option value="">-- Select Book --</option>
    <% if (bookList != null) {
     for (BookDTO book : bookList) { %>
    <option value="<%= book.getId() %>">
        <%= book.getTitle() %> by <%= book.getAuthor() %> (Rs. <%= book.getPrice() %>)
    </option>
<%  }
   } else { %>
    <option disabled>No books available</option>
<% } %>

</select>
<input type="number" name="quantity" placeholder="Quantity" required min="1" />
`;
        container.appendChild(div);
    }

    function submitForm(action) {
        document.getElementById('actionInput').value = action;
        document.getElementById('billForm').submit();
    }

</script>


</body>
</html>



