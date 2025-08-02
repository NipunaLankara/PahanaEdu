package servlet.pahanaedu.servlet.admin;

import servlet.pahanaedu.user.dto.UserDTO;
import servlet.pahanaedu.category.service.CategoryService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import servlet.pahanaedu.category.dto.CategoryDTO;

@WebServlet("/admin/manageCategory")
public class ManageCategory extends HttpServlet {
    private final CategoryService categoryService = new CategoryService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String action = request.getParameter("action");
        HttpSession session = request.getSession();
        UserDTO loggedInUser = (UserDTO) session.getAttribute("loggedInUser");

        if (loggedInUser == null || !"ADMIN".equalsIgnoreCase(loggedInUser.getRole())) {
            response.sendRedirect("../login.jsp");
            return;
        }

        try {
            if ("add".equals(action)) {
                String name = request.getParameter("name");
                String description = request.getParameter("description");

                CategoryDTO dto = new CategoryDTO();
                dto.setName(name);
                dto.setDescription(description);
                categoryService.addCategory(dto);

                session.setAttribute("successMessage", "Category added successfully!");

            } else if ("delete".equals(action)) {
                int id = Integer.parseInt(request.getParameter("id"));
                categoryService.deleteCategory(id);
                session.setAttribute("successMessage", "Category deleted successfully!");

            } else if ("update".equals(action)) {
                int id = Integer.parseInt(request.getParameter("id"));
                String name = request.getParameter("name");
                String description = request.getParameter("description");

                CategoryDTO dto = new CategoryDTO(id, name, description);
                categoryService.updateCategory(dto);
                session.setAttribute("successMessage", "Category updated successfully!");
            }
        } catch (SQLException e) {
            session.setAttribute("errorMessage", "Database error: " + e.getMessage());
        }

        response.sendRedirect("manageCategory");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        UserDTO loggedInUser = (UserDTO) session.getAttribute("loggedInUser");

        if (loggedInUser == null || !"ADMIN".equalsIgnoreCase(loggedInUser.getRole())) {
            response.sendRedirect("../login.jsp");
            return;
        }

        try {
            List<CategoryDTO> categories = categoryService.getAllCategories();
            request.setAttribute("categories", categories);
            request.getRequestDispatcher("/admin/manageCategories.jsp").forward(request, response);
        } catch (SQLException e) {
            throw new ServletException(e);
        }
    }
}

