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
import java.util.*;

@WebServlet("/admin/create-bill")
public class BillServlet extends HttpServlet {
    private final BillService billService = new BillService();
    private final UserDAO userDAO = new UserDAO();
    private final BookService bookService = new BookService();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String customerEmail = request.getParameter("customerEmail");
        int customerId = userDAO.getCustomerIdByEmail(customerEmail);

        if (customerId == -1) {
            request.setAttribute("error", "Customer not found.");
            request.getRequestDispatcher("/admin/billResult.jsp").forward(request, response);
            return;
        }

        String[] bookIds = request.getParameterValues("bookId");
        String[] quantities = request.getParameterValues("quantity");

        List<BuyBookDTO> items = new ArrayList<>();
        double total = 0;

        for (int i = 0; i < bookIds.length; i++) {
            int bookId = Integer.parseInt(bookIds[i]);
            int quantity = Integer.parseInt(quantities[i]);

            BookDTO book = null;
            try {
                book = bookService.getBookById(bookId);
            } catch (Exception e) {
                e.printStackTrace();
            }

            if (book == null) continue;

            double price = book.getPrice();
            double subtotal = price * quantity;
            total += subtotal;

            BuyBookDTO item = new BuyBookDTO();
            item.setBookId(bookId);
            item.setQuantity(quantity);
            item.setPrice(price);
            items.add(item);
        }

        BillDTO bill = new BillDTO();
        bill.setCustomerId(customerId);
        bill.setItems(items);
        bill.setTotalAmount(total);

        boolean success = billService.createBill(bill);
        request.setAttribute("message", success ? "Bill created successfully!" : "Failed to create bill.");
        request.getRequestDispatcher("/admin/billResult.jsp").forward(request, response);
    }
}
