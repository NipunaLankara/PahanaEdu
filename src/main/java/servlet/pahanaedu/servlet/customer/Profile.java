package servlet.pahanaedu.servlet.customer;


import servlet.pahanaedu.user.dto.UserDTO;
import servlet.pahanaedu.user.mapper.UserMapper;
import servlet.pahanaedu.user.model.User;
import servlet.pahanaedu.user.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/customer/updateProfile")
public class Profile extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession();
        User loggedInUser = (User) session.getAttribute("loggedInUser");

        if (loggedInUser == null || !"CUSTOMER".equalsIgnoreCase(loggedInUser.getRole())) {
            response.sendRedirect("../login.jsp");
            return;
        }

        int id = loggedInUser.getId();
        String name = request.getParameter("name");
        String nic = request.getParameter("nic");
        String email = request.getParameter("email");
        String contact = request.getParameter("contact");
        String address = request.getParameter("address");

        UserDTO updatedUserDTO = new UserDTO();
        updatedUserDTO.setId(id);
        updatedUserDTO.setName(name);
        updatedUserDTO.setNic(nic);
        updatedUserDTO.setEmail(email);
        updatedUserDTO.setContactNumber(contact);
        updatedUserDTO.setAddress(address);
        updatedUserDTO.setRole("CUSTOMER");

        UserService userService = new UserService();
        try {
            userService.updateUser(updatedUserDTO);
            session.setAttribute("loggedInUser", UserMapper.toEntity(updatedUserDTO)); // Update session properly
            response.sendRedirect("profile.jsp?success=true");
        } catch (SQLException e) {
            throw new ServletException("Error updating profile", e);
        }

    }
}
