package servlet.pahanaedu.servlet.customer;


import servlet.pahanaedu.bill.dto.BillDTO;
import servlet.pahanaedu.bill.service.BillService;
import servlet.pahanaedu.user.dto.UserDTO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
        import java.io.IOException;
import java.util.List;

@WebServlet("/customer/my-bills")
public class CustomerBill extends HttpServlet {

    private final BillService billService = new BillService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        HttpSession session = request.getSession(false);
        UserDTO user = (UserDTO) session.getAttribute("loggedInUser");

        if (user == null) {
            response.sendRedirect("../login.jsp");
            return;
        }

        List<BillDTO> customerBills = billService.getBillsByCustomerId(user.getId());
        request.setAttribute("bills", customerBills);
        request.getRequestDispatcher("/customer/my-bills.jsp").forward(request, response);
    }
}
