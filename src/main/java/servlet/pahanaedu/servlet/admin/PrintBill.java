package servlet.pahanaedu.servlet.admin;

import servlet.pahanaedu.bill.dto.BillDTO;
import servlet.pahanaedu.bill.service.BillService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/admin/print-bill")
public class PrintBill extends HttpServlet {
    private final BillService billService = new BillService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String billIdParam = request.getParameter("billId");
        if (billIdParam == null) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Bill ID is required.");
            return;
        }

        int billId;
        try {
            billId = Integer.parseInt(billIdParam);
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Bill ID.");
            return;
        }

        BillDTO billDTO = billService.getBillById(billId); // You must implement this in BillService
        if (billDTO == null) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Bill not found.");
            return;
        }

        request.setAttribute("bill", billDTO);
        request.getRequestDispatcher("/admin/print-bill.jsp").forward(request, response);
    }
}
