package servlet.pahanaedu.servlet.admin;

import servlet.pahanaedu.bill.dto.BillDTO;
import servlet.pahanaedu.bill.dto.BuyBookDTO;
import servlet.pahanaedu.bill.service.BillService;
import servlet.pahanaedu.book.dto.BookDTO;
import servlet.pahanaedu.book.service.BookService;
import servlet.pahanaedu.user.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.*;

@WebServlet("/admin/bill")
public class BillServlet extends HttpServlet {
    private final BillService billService = new BillService();
    private final UserService userService = new UserService();
    private final BookService bookService = new BookService();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String action = request.getParameter("action");
        String customerEmail = request.getParameter("customerEmail");

        if (customerEmail == null || customerEmail.trim().isEmpty() || !isValidEmail(customerEmail)) {
            request.setAttribute("error", "Invalid email format.");
            forwardToBillForm(request, response, null, null, null, "create");
            return;
        }

        String customerId = null;
        try {
            customerId = userService.getCustomerIdByEmail(customerEmail);
        } catch (SQLException e) {
            throw new ServletException("Failed to retrieve customer by email.", e);
        }

        if ("verify".equals(action)) {
            if (customerId == null) {
                request.setAttribute("error", "Customer email not found.");
                forwardToBillForm(request, response, null, null, null, "create");
            } else {
                request.setAttribute("message", "Customer email verified successfully.");
                forwardToBillForm(request, response, customerEmail, null, null, "confirm");
            }
            return;
        }

        if (customerId == null) {
            request.setAttribute("error", "Customer not found.");
            forwardToBillForm(request, response, null, null, null, "create");
            return;
        }

        String[] bookIds = request.getParameterValues("bookId");
        String[] quantities = request.getParameterValues("quantity");

        if (bookIds == null || bookIds.length == 0) {
            request.setAttribute("error", "No books provided.");
            forwardToBillForm(request, response, customerEmail, null, null, "confirm");
            return;
        }

        List<BuyBookDTO> items = new ArrayList<>();
        double total = 0;
        List<String> stockErrors = new ArrayList<>();

        for (int i = 0; i < bookIds.length; i++) {
            int bookId = Integer.parseInt(bookIds[i]);
            int qty = Integer.parseInt(quantities[i]);

            BookDTO book;
            try {
                book = bookService.getBookById(bookId);
            } catch (SQLException e) {
                throw new ServletException("Error retrieving book", e);
            }

            if (book == null) continue;

            if (book.getQuantity() ==0) {
                stockErrors.add("Out of Stock for book: " + book.getTitle());
                continue;

            }

            if (qty > book.getQuantity()) {
                stockErrors.add("Only " + book.getQuantity() + " copies available for book: " + book.getTitle());
                continue;
            }

            double price = book.getPrice();
            double subtotal = price * qty;
            total += subtotal;

            BuyBookDTO item = new BuyBookDTO();
            item.setBookId(bookId);
            item.setQuantity(qty);
            item.setPrice(price);
            item.setBook(book);
            items.add(item);
        }

        // Handle insufficient stock
        if (!stockErrors.isEmpty()) {
            request.setAttribute("error", String.join("<br/>", stockErrors));
            forwardToBillForm(request, response, customerEmail, items, total, "confirm");
            return;
        }

        if ("confirm".equals(action)) {
            forwardToBillForm(request, response, customerEmail, items, total, "create");
        } else if ("create".equals(action)) {
            BillDTO bill = new BillDTO(customerId, total, items);
            int billId = billService.createBill(bill);

            if (billId != -1) {
                response.sendRedirect("print-bill?billId=" + billId);
            } else {
                request.setAttribute("message", "Failed to create bill.");
                forwardToBillForm(request, response, customerEmail, items, total, "create");
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        forwardToBillForm(request, response, null, null, null, "create");
    }

    private void forwardToBillForm(HttpServletRequest request, HttpServletResponse response,
                                   String email, List<BuyBookDTO> list, Double total, String action)
            throws ServletException, IOException {
        request.setAttribute("customerEmail", email);
        request.setAttribute("buyBookList", list);
        request.setAttribute("total", total);
        request.setAttribute("action", action);

        try {
            List<BookDTO> books = bookService.getAllBooks();
            request.setAttribute("bookList", books);
        } catch (SQLException e) {
            throw new ServletException("Error loading books", e);
        }

        request.getRequestDispatcher("/admin/bill.jsp").forward(request, response);
    }

    private boolean isValidEmail(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    }
}
