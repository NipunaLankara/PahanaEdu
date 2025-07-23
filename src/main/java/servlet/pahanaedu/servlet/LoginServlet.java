package servlet.pahanaedu.servlet;

import org.mindrot.jbcrypt.BCrypt;
import servlet.pahanaedu.db.DBConnection;
import servlet.pahanaedu.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet ("/login")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String errorMessage = null;

        if (email.isEmpty() || password.isEmpty()) {
            errorMessage = "Username and password are required.";
        } else {
            try (Connection connection = DBConnection.getConnection()) {
                PreparedStatement preparedStatement = connection.prepareStatement(
                        "SELECT id, email, password, role FROM user WHERE email = ?"
                );
                preparedStatement.setString(1, email);
                ResultSet resultSet = preparedStatement.executeQuery();

                if (resultSet.next()) {
                    String storedHashedPassword = resultSet.getString("password");
                    String loginUserEmail = resultSet.getString("email");
                    String loginUserRole = resultSet.getString("role");

                    if (checkPassword(password, storedHashedPassword)) {
                        // Store full user object in session
                        HttpSession session = request.getSession();
                        User loggedInUser = new User();
                        loggedInUser.setId(resultSet.getInt("id"));
                        loggedInUser.setEmail(loginUserEmail);
                        loggedInUser.setRole(loginUserRole);

                        session.setAttribute("email", loginUserEmail);
                        session.setAttribute("role", loginUserRole);
                        session.setAttribute("loggedInUser", loggedInUser); // Store full user object

                        if ("ADMIN".equalsIgnoreCase(loginUserRole)) {
                            response.sendRedirect("admin/customers.jsp");
                        } else if ("CUSTOMER".equalsIgnoreCase(loginUserRole)) {
                            response.sendRedirect("index.jsp");
                        } else {
                            errorMessage = "Invalid role. Please contact the administrator.";
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
