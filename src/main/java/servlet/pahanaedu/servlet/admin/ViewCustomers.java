package servlet.pahanaedu.servlet.admin;

import servlet.pahanaedu.user.dto.UserDTO;
import servlet.pahanaedu.user.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/admin/customers")
public class ViewCustomers extends HttpServlet {

    private final UserService userService = new UserService();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        UserDTO loggedInUser = (UserDTO) (session != null ? session.getAttribute("loggedInUser") : null);

        if (loggedInUser == null || !"ADMIN".equalsIgnoreCase(loggedInUser.getRole())) {
            response.sendRedirect("../login.jsp");
            return;
        }

        try {
            List<UserDTO> customers = userService.getAllCustomers();
            request.setAttribute("customerList", customers);
            request.getRequestDispatcher("customers.jsp").forward(request, response);
        } catch (SQLException e) {
            throw new ServletException("Failed to load customers", e);
        }
    }
}
