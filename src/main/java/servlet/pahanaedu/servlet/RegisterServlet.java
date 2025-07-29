package servlet.pahanaedu.servlet;

import servlet.pahanaedu.user.dto.UserDTO;
import servlet.pahanaedu.user.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    private final UserService userService = new UserService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserDTO dto = new UserDTO(
                request.getParameter("name"),
                request.getParameter("address"),
                request.getParameter("email"),
                request.getParameter("nic"),
                request.getParameter("phoneNumber"),
                request.getParameter("password"),
                request.getParameter("confirmPassword")
        );

        String errorMessage = null;

        if (dto.getName().isEmpty() || dto.getAddress().isEmpty() || dto.getEmail().isEmpty() ||
                dto.getNic().isEmpty() || dto.getContactNumber().isEmpty() ||
                dto.getPassword().isEmpty() || dto.getConfirmPassword().isEmpty()) {

            errorMessage = "All fields are required.";

        } else if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            errorMessage = "Passwords do not match.";

        } else if (dto.getPassword().length() < 5) {
            errorMessage = "Password must be at least 5 characters long.";

        } else {
            try {
                if (userService.checkEmail(dto.getEmail())) {
                    errorMessage = "Email is already registered.";
                } else if (userService.checkPhoneNumber(dto.getContactNumber())) {
                    errorMessage = "Phone number is already registered.";
                } else {
                    // Register user using DTO - service handles conversion and hashing
                    userService.registerNewUser(dto);
                    response.sendRedirect("login.jsp");
                    return;
                }
            } catch (SQLException e) {
                e.printStackTrace();
                errorMessage = "An unexpected error occurred. Please try again later.";
            }
        }

        if (errorMessage != null) {
            request.setAttribute("errorMessage", errorMessage);
            request.getRequestDispatcher("register.jsp").forward(request, response);
        }
    }
}
