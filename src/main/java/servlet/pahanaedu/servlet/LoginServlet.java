// File: servlet/pahanaedu/servlet/LoginServlet.java
package servlet.pahanaedu.servlet;

import servlet.pahanaedu.factory.UserFactory;
import servlet.pahanaedu.user.dto.UserDTO;
import servlet.pahanaedu.user.model.product.UserType;
import servlet.pahanaedu.user.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private final UserService userService = new UserService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String errorMessage = null;

        if (email.isEmpty() || password.isEmpty()) {
            errorMessage = "Username and password are required.";
        } else {
            try {
                UserDTO userDTO = userService.authenticateUser(email, password);
                if (userDTO != null) {
                    // Factory usage
                    UserType user = UserFactory.createUserByRole(userDTO.getRole());

                    HttpSession session = request.getSession();
                    session.setAttribute("loggedInUser", userDTO);
                    session.setAttribute("email", userDTO.getEmail());
                    session.setAttribute("role", userDTO.getRole());
                    session.setAttribute("permissions", user.getPermissions());

                    if ("ADMIN".equalsIgnoreCase(userDTO.getRole())) {
                        response.sendRedirect("admin/adminDashboard.jsp");
                    } else if ("CUSTOMER".equalsIgnoreCase(userDTO.getRole())) {
                        response.sendRedirect("customer/customer-dashboard.jsp");
                    } else {
                        errorMessage = "Unknown role.";
                    }
                } else {
                    errorMessage = "Invalid email or password.";
                }
            } catch (SQLException e) {
                throw new ServletException("Database error during login", e);
            }
        }

        if (errorMessage != null) {
            request.setAttribute("errorMessage", errorMessage);
            request.getRequestDispatcher("login.jsp").forward(request, response);
        }
    }
}
