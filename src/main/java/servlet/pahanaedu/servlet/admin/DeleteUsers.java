package servlet.pahanaedu.servlet.admin;

import servlet.pahanaedu.user.dto.UserDTO;
import servlet.pahanaedu.user.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/admin/deleteUser")
public class DeleteUsers extends HttpServlet {

    private UserService userService = new UserService();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        UserDTO loggedInUser = (UserDTO) request.getSession().getAttribute("loggedInUser");

        if (loggedInUser == null || !"ADMIN".equalsIgnoreCase(loggedInUser.getRole())) {
            response.sendRedirect("../login.jsp");
            return;
        }

        String userId = request.getParameter("id");
        try {
            boolean deleted = userService.deleteUserById(userId);
            if (deleted) {
                response.sendRedirect("customers?success=Customer+deleted+successfully");
            } else {
                response.sendRedirect("customers?error=No+customer+found+with+given+ID");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response.sendRedirect("customers?error=Database+error+while+deleting+customer");
        }
    }
}

