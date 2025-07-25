package servlet.pahanaedu.servlet;

import org.mindrot.jbcrypt.BCrypt;
import servlet.pahanaedu.factory.UserFactory;
import servlet.pahanaedu.model.User;
import servlet.pahanaedu.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    private final UserService userService = new UserService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        String address = request.getParameter("address");
        String email = request.getParameter("email");
        String nic = request.getParameter("nic");
        String contact = request.getParameter("phoneNumber");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");

        String role = "CUSTOMER";
        String errorMessage = null;

        if (name.isEmpty() || address.isEmpty() || email.isEmpty() ||
                nic.isEmpty() || contact.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
            errorMessage = "All fields are required.";
        } else if (!password.equals(confirmPassword)) {
            errorMessage = "Passwords do not match.";
        } else if (password.length() < 5) {
            errorMessage = "Password must be at least 5 characters long.";
        } else {
            try {
                if (userService.checkEmail(email)) {
                    errorMessage = "Email is already registered.";
                } else if (userService.checkPhoneNumber(contact)) {
                    errorMessage = "Phone number is already registered.";
                } else {

                    User user = UserFactory.createUser(role);

                    user.setName(name);
                    user.setAddress(address);
                    user.setEmail(email);
                    user.setNic(nic);
                    user.setContactNumber(contact);
                    user.setPassword(hashPassword(password));
                    user.setRole(role);

                    userService.registerNewUser(user);
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

    public static String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }
}
