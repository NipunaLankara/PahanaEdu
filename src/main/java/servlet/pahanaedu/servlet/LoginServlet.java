package servlet.pahanaedu.servlet;

import org.mindrot.jbcrypt.BCrypt;
import servlet.pahanaedu.db.DBConnection;
import servlet.pahanaedu.factory.UserFactory;
import servlet.pahanaedu.model.User;
import servlet.pahanaedu.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.*;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String errorMessage = null;

        if (email.isEmpty() || password.isEmpty()) {
            errorMessage = "Username and password are required.";
        } else {
            try (Connection connection = DBConnection.getConnection()) {
                PreparedStatement ps = connection.prepareStatement(
                        "SELECT id, password, role FROM user WHERE email = ?"
                );
                ps.setString(1, email);
                ResultSet rs = ps.executeQuery();

                if (rs.next()) {
                    String hashedPassword = rs.getString("password");
                    String role = rs.getString("role");
                    int userId = rs.getInt("id");

                    if (checkPassword(password, hashedPassword)) {
                        UserService userService = new UserService();
                        User baseUser = userService.getUserById(userId); // contains full user details


                        User user = UserFactory.createUser(role);
                        user.setId(baseUser.getId());
                        user.setName(baseUser.getName());
                        user.setEmail(baseUser.getEmail());
                        user.setAddress(baseUser.getAddress());
                        user.setNic(baseUser.getNic());
                        user.setContactNumber(baseUser.getContactNumber());
                        user.setRole(baseUser.getRole());

                        HttpSession session = request.getSession();
                        session.setAttribute("loggedInUser", user);
                        session.setAttribute("email", user.getEmail());
                        session.setAttribute("role", user.getRole());

                        // Redirect based on role
                        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
                            response.sendRedirect("admin/customers.jsp");
                        } else if ("CUSTOMER".equalsIgnoreCase(user.getRole())) {
                            response.sendRedirect("index.jsp");
                        } else {
                            errorMessage = "Unknown role.";
                        }

                    } else {
                        errorMessage = "Invalid email or password.";
                    }
                } else {
                    errorMessage = "Invalid email or password.";
                }

            } catch (SQLException e) {
                throw new RuntimeException("Database error occurred", e);
            }
        }

        if (errorMessage != null) {
            request.setAttribute("errorMessage", errorMessage);
            request.getRequestDispatcher("login.jsp").forward(request, response);
        }
    }

    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }
}
