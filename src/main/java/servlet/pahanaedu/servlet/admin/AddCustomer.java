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

        String name = request.getParameter("name");
        String address = request.getParameter("address");
        String email = request.getParameter("email");
        String nic = request.getParameter("nic");
        String contactNumber = request.getParameter("contactNumber");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");

        if (!password.equals(confirmPassword)) {
            request.setAttribute("error", "Password and Confirm Password do not match.");
            request.getRequestDispatcher("/admin/addCcustomer.jsp").forward(request, response);
            return;
        }

        UserDTO newCustomer = new UserDTO(name, address, email, nic, contactNumber, password, confirmPassword);

        try {
            if (userService.checkEmail(email)) {
                request.setAttribute("error", "Email already exists.");
            } else if (userService.checkPhoneNumber(contactNumber)) {
                request.setAttribute("error", "Phone number already exists.");
            } else {
                userService.registerNewUser(newCustomer);
                request.setAttribute("success", "Customer added successfully.");
            }
        } catch (SQLException e) {
            request.setAttribute("error", "Error occurred while adding customer: " + e.getMessage());
        }

        request.getRequestDispatcher("/admin/adminDashboard.jsp").forward(request, response);
    }
}
