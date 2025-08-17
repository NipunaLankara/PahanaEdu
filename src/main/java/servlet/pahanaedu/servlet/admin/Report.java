package servlet.pahanaedu.servlet.admin;

import servlet.pahanaedu.bill.service.BillService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/admin/reports")
public class Report extends HttpServlet {

    private final BillService billService = new BillService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            List<Object[]> dailySales = billService.getDailySales();
            List<Object[]> topBooks = billService.getTopSellingBooks();
            List<Object[]> topCustomers = billService.getTopCustomers();

            request.setAttribute("dailySales", dailySales);
            request.setAttribute("topBooks", topBooks);
            request.setAttribute("topCustomers", topCustomers);

            request.getRequestDispatcher("/admin/admin-reports.jsp").forward(request, response);
        } catch (SQLException e) {
            throw new ServletException("Error fetching reports", e);
        }
    }
}
