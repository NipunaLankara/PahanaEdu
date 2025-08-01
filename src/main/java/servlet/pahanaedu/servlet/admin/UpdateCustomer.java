package servlet.pahanaedu.servlet.admin;

import servlet.pahanaedu.user.dto.UserDTO;
import servlet.pahanaedu.user.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/admin/updateCustomer")
public class UpdateCustomer extends HttpServlet {
    private final UserService userService = new UserService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        UserDTO loggedInUser = (UserDTO) (session != null ? session.getAttribute("loggedInUser") : null);

        if (loggedInUser == null || !"ADMIN".equalsIgnoreCase(loggedInUser.getRole())) {
            response.sendRedirect("../login.jsp");
            return;
        }

        try {
            String id = request.getParameter("id");
            String name = request.getParameter("name");
            String nic = request.getParameter("nic");
            String email = request.getParameter("email");
            String contact = request.getParameter("contact");
            String address = request.getParameter("address");
            String role = request.getParameter("role");

            UserDTO userDTO = new UserDTO();
            userDTO.setId(id);
            userDTO.setName(name);
            userDTO.setNic(nic);
            userDTO.setEmail(email);
            userDTO.setContactNumber(contact);
            userDTO.setAddress(address);
            userDTO.setRole(role);

            userService.updateUser(userDTO);
            response.sendRedirect("customers"); // redirect to list page
        } catch (SQLException e) {
            throw new ServletException("Error updating user", e);
        }
    }
}
