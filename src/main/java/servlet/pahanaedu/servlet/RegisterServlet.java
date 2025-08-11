// File: servlet/pahanaedu/servlet/RegisterServlet.java
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

        String name = request.getParameter("name").trim();
        String address = request.getParameter("address").trim();
        String email = request.getParameter("email").trim();
        String nic = request.getParameter("nic").trim();
        String contactNumber = request.getParameter("phoneNumber").trim();
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");

        String errorMessage = null;

        // Name validation
        if (name.isEmpty() || !name.matches("^[A-Za-z ]{3,}$")) {
            errorMessage = "Name must be at least 3 letters and contain only alphabets.";
        }
        // Address validation
        else if (address.isEmpty() || address.length() < 5) {
            errorMessage = "Address must be at least 5 characters long.";
        }
        // Email validation
        else if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            errorMessage = "Invalid email format.";
        }
        // NIC validation (supports old and new formats)
        else if (!nic.matches("^[0-9]{9}[VvXx]$") && !nic.matches("^[0-9]{12}$")) {
            errorMessage = "Invalid NIC format.";
        }
        // Phone number validation
        else if (!contactNumber.matches("^0[0-9]{9}$")) {
            errorMessage = "Contact number must be 10 digits and start with 0.";
        }
        // Password match check
        else if (!password.equals(confirmPassword)) {
            errorMessage = "Passwords do not match.";
        }
        // Password strength check
        else if (!password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{5,}$")) {
            errorMessage = "Password must be at least 5 characters and include upper, lower, number, and special character.";
        }
        // Database checks
        else {
            try {
                if (userService.checkEmail(email)) {
                    errorMessage = "Email is already registered.";
                } else if (userService.checkPhoneNumber(contactNumber)) {
                    errorMessage = "Phone number is already registered.";
                } else {
                    UserDTO newCustomer = new UserDTO(name, address, email, nic, contactNumber, password, confirmPassword);
                    userService.registerNewUser(newCustomer);
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
