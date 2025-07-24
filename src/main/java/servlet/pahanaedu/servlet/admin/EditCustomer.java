package servlet.pahanaedu.servlet.admin;

import servlet.pahanaedu.model.User;
import servlet.pahanaedu.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/admin/editCustomer")
public class EditCustomer extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));

        UserService userService = new UserService();
        try {
            User user = userService.getUserById(id);
            if (user != null) {
                request.setAttribute("user", user);
                request.getRequestDispatcher("editCustomerForm.jsp").forward(request, response);
            } else {
                response.sendRedirect("customers.jsp");
            }
        } catch (SQLException e) {
            throw new ServletException("Error fetching user", e);
        }
    }
}
