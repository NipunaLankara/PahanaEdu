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

        String action = request.getParameter("action");
        String customerEmail = request.getParameter("customerEmail");
        String customerId = userDAO.getCustomerIdByEmail(customerEmail);

        if (customerId == null) {
            request.setAttribute("error", "Customer not found.");
            forwardToBillForm(request, response, customerEmail, null, null, "confirm");
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

        for (int i = 0; i < bookIds.length; i++) {
            int bookId = Integer.parseInt(bookIds[i]);
            int qty = Integer.parseInt(quantities[i]);

            BookDTO book;
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
            forwardToBillForm(request, response, customerEmail, items, total, "create");
        } else if ("create".equals(action)) {
            BillDTO bill = new BillDTO(customerId, total, items);
            int billId = billService.createBill(bill);

            if (billId != -1) {
                response.sendRedirect("print-bill?billId=" + billId); // ✅ Redirect directly to print-bill.jsp
            } else {
                request.setAttribute("message", "Failed to create bill.");
                request.getRequestDispatcher("/admin/bill.jsp").forward(request, response);
            }


        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Default to empty form with "create" action
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
        System.out.println("Loaded books count: " + (books != null ? books.size() : "null"));

        request.setAttribute("bookList", books);
    } catch (SQLException e) {
        throw new ServletException("Error loading books", e);
    }


    request.getRequestDispatcher("/admin/bill.jsp").forward(request, response);
}

}


//    private void forwardToBillForm(HttpServletRequest request, HttpServletResponse response,
//                                   String email, List<BuyBookDTO> list, Double total, String action)
//            throws ServletException, IOException {
//
//        request.setAttribute("customerEmail", email);
//        request.setAttribute("buyBookList", list);
//        request.setAttribute("total", total);
//        request.setAttribute("action", action);
//        request.getRequestDispatcher("/admin/bill.jsp").forward(request, response);
//    }
