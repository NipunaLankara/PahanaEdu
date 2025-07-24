package servlet.pahanaedu.servlet.customer;


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

@WebServlet("/customer/updateProfile")
public class Profile extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession();
        User loggedInUser = (User) session.getAttribute("loggedInUser");

        if (loggedInUser == null || !"CUSTOMER".equalsIgnoreCase(loggedInUser.getRole())) {
            response.sendRedirect("../login.jsp");
            return;
        }

        int id = loggedInUser.getId();
        String name = request.getParameter("name");
        String nic = request.getParameter("nic");
        String email = request.getParameter("email");
        String contact = request.getParameter("contact");
        String address = request.getParameter("address");

        User updatedUser = new User();
        updatedUser.setId(id);
        updatedUser.setName(name);
        updatedUser.setNic(nic);
        updatedUser.setEmail(email);
        updatedUser.setContactNumber(contact);
        updatedUser.setAddress(address);
        updatedUser.setRole("CUSTOMER"); // Ensure role stays correct

        UserService userService = new UserService();
        try {
            userService.updateUser(updatedUser);
            session.setAttribute("loggedInUser", updatedUser); // Update session
            response.sendRedirect("profile.jsp?success=true");
        } catch (SQLException e) {
            throw new ServletException("Error updating profile", e);
        }
    }
}
