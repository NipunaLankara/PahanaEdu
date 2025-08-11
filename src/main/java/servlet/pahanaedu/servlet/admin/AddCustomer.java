package servlet.pahanaedu.servlet.admin;

import servlet.pahanaedu.user.dto.UserDTO;
import servlet.pahanaedu.user.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/admin/addCustomer")
public class AddCustomer extends HttpServlet {

    private final UserService userService = new UserService();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String name = request.getParameter("name").trim();
        String address = request.getParameter("address").trim();
        String email = request.getParameter("email").trim();
        String nic = request.getParameter("nic").trim();
        String contactNumber = request.getParameter("contactNumber").trim();
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");

        String errorMessage = validateCustomer(name, address, email, nic, contactNumber, password, confirmPassword);

        if (errorMessage == null) {
            try {
                if (userService.checkEmail(email)) {
                    errorMessage = "Email is already registered.";
                } else if (userService.checkPhoneNumber(contactNumber)) {
                    errorMessage = "Phone number is already registered.";
                } else {
                    UserDTO newCustomer = new UserDTO(name, address, email, nic, contactNumber, password, confirmPassword);
                    userService.registerNewUser(newCustomer);

                    response.sendRedirect(request.getContextPath() + "/admin/addCustomer.jsp?success=1");
                    return;
                }
            } catch (SQLException e) {
                e.printStackTrace();
                errorMessage = "An unexpected error occurred. Please try again later.";
            }
        }

        // Forward back if error exists
        request.setAttribute("errorMessage", errorMessage);
        request.getRequestDispatcher("/admin/addCustomer.jsp").forward(request, response);
    }


    public String validateCustomer(String name, String address, String email, String nic,
                                   String contactNumber, String password, String confirmPassword) {

        if (name == null || name.isEmpty() || !name.matches("^[A-Za-z ]{3,}$")) {
            return "Name must be at least 3 letters and contain only alphabets.";
        }
        if (address == null || address.isEmpty() || address.length() < 5) {
            return "Address must be at least 5 characters long.";
        }
        if (email == null || !email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            return "Invalid email format.";
        }
        if (nic == null || (!nic.matches("^[0-9]{9}[VvXx]$") && !nic.matches("^[0-9]{12}$"))) {
            return "Invalid NIC format.";
        }
        if (contactNumber == null || !contactNumber.matches("^0[0-9]{9}$")) {
            return "Contact number must be 10 digits and start with 0.";
        }
        if (!password.equals(confirmPassword)) {
            return "Passwords do not match.";
        }
        if (!password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{5,}$")) {
            return "Password must be at least 5 characters and include upper, lower, number, and special character.";
        }
        return null; // all good
    }
}
