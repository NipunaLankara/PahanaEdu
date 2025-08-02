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
    <div class="message"><%= message %></div>
    <% } %>
    <% if (error != null) { %>
    <div class="error"><%= error %></div>
    <% } %>

    <form method="post" action="bill" id="billForm">
        <input type="hidden" name="action" value="<%= action %>"/>

        <div class="section">
            <label><strong>Customer Email:</strong></label>
            <input type="email" name="customerEmail" value="<%= customerEmail != null ? customerEmail : "" %>" required/>
        </div>

        <div class="section">
            <label><strong>Book Items:</strong></label>
            <div id="bookInputs">
                <% if (buyBookList == null) { %>
                <div class="form-row">
                    <input type="number" name="bookId" placeholder="Book ID" required/>
                    <input type="number" name="quantity" placeholder="Quantity" required min="1"/>
                </div>
                <% } else {
                    for (BuyBookDTO item : buyBookList) { %>
                <input type="hidden" name="bookId" value="<%= item.getBookId() %>"/>
                <input type="hidden" name="quantity" value="<%= item.getQuantity() %>"/>
                <%  } } %>
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
                    <td><%= book.getTitle() %></td>
                    <td><%= book.getAuthor() %></td>
                    <td><%= item.getPrice() %></td>
                    <td><%= item.getQuantity() %></td>
                    <td><%= subtotal %></td>
                </tr>
                <% } %>
                </tbody>
            </table>
            <div style="text-align: right; margin-top: 10px;">
                <strong>Total: Rs. <%= total != null ? total : 0.0 %></strong>
            </div>
        </div>
        <% } %>

        <div class="section">
            <button type="submit" class="btn submit-btn">
                <%= (buyBookList != null && "create".equals(action)) ? "Place Bill" : "Confirm Bill" %>
            </button>

            <% if (buyBookList != null && !buyBookList.isEmpty()) { %>
            <a href="print-bill?customerEmail=<%= customerEmail %>" target="_blank" class="btn print-btn">
                🖨️ Print Bill
            </a>
            <% } %>
        </div>
    </form>
</div>

<% Integer billId = (Integer) request.getAttribute("billId"); %>
<% if (billId != null) { %>
<script>
    // Redirect to print-bill page automatically
    window.onload = function () {
        window.open("print-bill?billId=<%= billId %>", "_blank");
    };
</script>
<% } %>


<script src="js/bill.js"></script>
<script>
    function addBookInput() {
        const container = document.getElementById("bookInputs");
        const div = document.createElement("div");
        div.className = "form-row";
        div.innerHTML = `
            <input type="number" name="bookId" placeholder="Book ID" required />
            <input type="number" name="quantity" placeholder="Quantity" required min="1" />
        `;
        container.appendChild(div);
    }
</script>
</body>
</html>


<%--<%@ page import="java.util.List" %>--%>
<%--<%@ page import="servlet.pahanaedu.bill.dto.BuyBookDTO" %>--%>
<%--<%@ page import="servlet.pahanaedu.book.dto.BookDTO" %>--%>
<%--<%@ page contentType="text/html;charset=UTF-8" %>--%>
<%--<%--%>
<%--    String action = request.getAttribute("action") != null ? (String) request.getAttribute("action") : "confirm";--%>
<%--    String customerEmail = (String) request.getAttribute("customerEmail");--%>
<%--    List<BuyBookDTO> buyBookList = (List<BuyBookDTO>) request.getAttribute("buyBookList");--%>
<%--    Double total = (Double) request.getAttribute("total");--%>
<%--    String message = (String) request.getAttribute("message");--%>
<%--    String error = (String) request.getAttribute("error");--%>
<%--%>--%>
<%--<!DOCTYPE html>--%>
<%--<html>--%>
<%--<head>--%>
<%--    <meta charset="UTF-8">--%>
<%--    <title>Create Bill</title>--%>
<%--    <link rel="stylesheet" href="css/bill.css">--%>
<%--</head>--%>
<%--<body>--%>
<%--<div class="container">--%>
<%--    <h2>🧾 Create / Confirm Bill</h2>--%>

<%--    <% if (message != null) { %>--%>
<%--    <div class="message"><%= message %>--%>
<%--    </div>--%>
<%--    <% } %>--%>
<%--    <% if (error != null) { %>--%>
<%--    <div class="error"><%= error %>--%>
<%--    </div>--%>
<%--    <% } %>--%>

<%--    <form method="post" action="bill" id="billForm">--%>
<%--        <input type="hidden" name="action" value="<%= action %>"/>--%>

<%--        <div class="section">--%>
<%--            <label><strong>Customer Email:</strong></label>--%>
<%--            <input type="email" name="customerEmail" value="<%= customerEmail != null ? customerEmail : "" %>"--%>
<%--                   required/>--%>
<%--        </div>--%>

<%--        <div class="section">--%>
<%--            <label><strong>Book Items:</strong></label>--%>
<%--            <div id="bookInputs">--%>
<%--                <% if (buyBookList == null) { %>--%>
<%--                <div class="form-row">--%>
<%--                    <input type="number" name="bookId" placeholder="Book ID" required/>--%>
<%--                    <input type="number" name="quantity" placeholder="Quantity" required min="1"/>--%>
<%--                </div>--%>
<%--                <% } else {--%>
<%--                    for (BuyBookDTO item : buyBookList) { %>--%>
<%--                <input type="hidden" name="bookId" value="<%= item.getBookId() %>"/>--%>
<%--                <input type="hidden" name="quantity" value="<%= item.getQuantity() %>"/>--%>
<%--                <% }--%>
<%--                } %>--%>
<%--            </div>--%>

<%--            <% if (buyBookList == null) { %>--%>
<%--            <button type="button" class="btn add-btn" onclick="addBookInput()">+ Add Book</button>--%>
<%--            <% } %>--%>
<%--        </div>--%>

<%--        <% if (buyBookList != null && !buyBookList.isEmpty()) { %>--%>
<%--        <div class="section">--%>
<%--            <table>--%>
<%--                <thead>--%>
<%--                <tr>--%>
<%--                    <th>Book Title</th>--%>
<%--                    <th>Author</th>--%>
<%--                    <th>Price</th>--%>
<%--                    <th>Qty</th>--%>
<%--                    <th>Subtotal</th>--%>
<%--                </tr>--%>
<%--                </thead>--%>
<%--                <tbody>--%>
<%--                <% for (BuyBookDTO item : buyBookList) {--%>
<%--                    BookDTO book = item.getBook();--%>
<%--                    double subtotal = item.getPrice() * item.getQuantity(); %>--%>
<%--                <tr>--%>
<%--                    <td><%= book.getTitle() %>--%>
<%--                    </td>--%>
<%--                    <td><%= book.getAuthor() %>--%>
<%--                    </td>--%>
<%--                    <td><%= item.getPrice() %>--%>
<%--                    </td>--%>
<%--                    <td><%= item.getQuantity() %>--%>
<%--                    </td>--%>
<%--                    <td><%= subtotal %>--%>
<%--                    </td>--%>
<%--                </tr>--%>
<%--                <% } %>--%>
<%--                </tbody>--%>
<%--            </table>--%>
<%--            <div style="text-align: right; margin-top: 10px;">--%>
<%--                <strong>Total: Rs. <%= total != null ? total : 0.0 %>--%>
<%--                </strong>--%>
<%--            </div>--%>
<%--        </div>--%>
<%--        <% } %>--%>

<%--        <div class="section">--%>
<%--            <button type="submit" class="btn submit-btn">--%>
<%--                <%= (buyBookList != null && "create".equals(action)) ? "Place Bill" : "Confirm Bill" %>--%>
<%--            </button>--%>
<%--        </div>--%>
<%--    </form>--%>
<%--</div>--%>
<%--<script src="js/bill.js"></script>--%>
<%--<script>--%>
<%--    function addBookInput() {--%>
<%--        const container = document.getElementById("bookInputs");--%>
<%--        const div = document.createElement("div");--%>
<%--        div.className = "form-row";--%>
<%--        div.innerHTML = `--%>
<%--    <input type="number" name="bookId" placeholder="Book ID" required />--%>
<%--    <input type="number" name="quantity" placeholder="Quantity" required min="1" />--%>
<%--    `;--%>
<%--        container.appendChild(div);--%>
<%--    }--%>

<%--</script>--%>
<%--</body>--%>
<%--</html>--%>
