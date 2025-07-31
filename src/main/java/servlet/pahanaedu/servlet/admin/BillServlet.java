package servlet.pahanaedu.servlet.admin;

import servlet.pahanaedu.bill.dto.BillDTO;
import servlet.pahanaedu.bill.dto.BuyBookDTO;
import servlet.pahanaedu.bill.service.BillService;
import servlet.pahanaedu.book.dto.BookDTO;
import servlet.pahanaedu.book.service.BookService;
import servlet.persistence.user.dao.UserDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.*;

@WebServlet("/admin/bill")
public class BillServlet extends HttpServlet {
    private final BillService billService = new BillService();
    private final UserDAO userDAO = new UserDAO();
    private final BookService bookService = new BookService();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String action = request.getParameter("action"); // check what the form is doing
        String customerEmail = request.getParameter("customerEmail");
        int customerId = userDAO.getCustomerIdByEmail(customerEmail);

        if (customerId == -1) {
            request.setAttribute("error", "Customer not found.");
            request.getRequestDispatcher("/admin/bill.jsp").forward(request, response);
            return;
        }

        String[] bookIds = request.getParameterValues("bookId");
        String[] quantities = request.getParameterValues("quantity");

        if (bookIds == null || bookIds.length == 0) {
            request.setAttribute("error", "No books provided.");
            request.getRequestDispatcher("/admin/bill.jsp").forward(request, response);
            return;
        }

        List<BuyBookDTO> items = new ArrayList<>();
        double total = 0;

        for (int i = 0; i < bookIds.length; i++) {
            int bookId = Integer.parseInt(bookIds[i]);
            int qty = Integer.parseInt(quantities[i]);

            BookDTO book = null;
            try {
                book = bookService.getBookById(bookId);
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
            if (book == null) continue;

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

        if ("confirm".equals(action)) {
            // Step 1: Show bill confirmation before placing order
            request.setAttribute("customerEmail", customerEmail);
            request.setAttribute("buyBookList", items);
            request.setAttribute("total", total);
            request.setAttribute("action", "create"); // to show place order button
            request.getRequestDispatcher("/admin/bill.jsp").forward(request, response);

        } else if ("create".equals(action)) {
            // Step 2: Actually place the bill
            BillDTO bill = new BillDTO(customerId, total, items);
            boolean success = billService.createBill(bill);
            request.setAttribute("message", success ? "Bill successfully created!" : "Failed to create bill.");
            request.getRequestDispatcher("/admin/bill.jsp").forward(request, response);
        }
    }
}
