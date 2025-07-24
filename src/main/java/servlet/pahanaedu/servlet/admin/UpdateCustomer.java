package servlet.pahanaedu.servlet.admin;

import servlet.pahanaedu.model.User;
import servlet.pahanaedu.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/admin/updateCustomer")
public class UpdateCustomer extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        User loggedInUser = (User) session.getAttribute("loggedInUser");

        if (loggedInUser == null || !"ADMIN".equalsIgnoreCase(loggedInUser.getRole())) {
            response.sendRedirect("../login.jsp");
            return;
        }

        int id = Integer.parseInt(request.getParameter("id"));
        String name = request.getParameter("name");
        String nic = request.getParameter("nic");
        String email = request.getParameter("email");
        String contact = request.getParameter("contact");
        String address = request.getParameter("address");
        String role = request.getParameter("role");

        User user = new User();
        user.setId(id);
        user.setName(name);
        user.setNic(nic);
        user.setEmail(email);
        user.setContactNumber(contact);
        user.setAddress(address);
        user.setRole(role);

        UserService userService = new UserService();
        try {
            userService.updateUser(user);
            response.sendRedirect("customers"); // back to customer list
        } catch (SQLException e) {
            throw new ServletException("Error updating user", e);
        }
    }
}
