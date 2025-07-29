package servlet.pahanaedu.servlet.admin;

import servlet.pahanaedu.dto.UserDTO;
import servlet.pahanaedu.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/admin/editCustomer")
public class EditCustomer extends HttpServlet {
    private final UserService userService = new UserService();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        UserDTO loggedInUser = (UserDTO) (session != null ? session.getAttribute("loggedInUser") : null);

        if (loggedInUser == null || !"ADMIN".equalsIgnoreCase(loggedInUser.getRole())) {
            response.sendRedirect("../login.jsp");
            return;
        }

        int id = Integer.parseInt(request.getParameter("id"));

        try {
            UserDTO userDTO = userService.getUserById(id);
            if (userDTO != null) {
                request.setAttribute("user", userDTO);
                request.getRequestDispatcher("editCustomerForm.jsp").forward(request, response);
            } else {
                response.sendRedirect("customers");
            }
        } catch (SQLException e) {
            throw new ServletException("Error fetching user", e);
        }
    }
}
