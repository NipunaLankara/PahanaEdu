package servlet.pahanaedu.servlet.admin;


import servlet.pahanaedu.model.Category;
import servlet.pahanaedu.service.CategoryService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
        import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/admin/manageCategory")
public class ManageCategory extends HttpServlet {
    private final CategoryService categoryService = new CategoryService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String action = request.getParameter("action");

        try {
            if ("add".equals(action)) {
                String name = request.getParameter("name");
                String description = request.getParameter("description");

                Category cat = new Category(name, description);
                categoryService.addCategory(cat);

            } else if ("delete".equals(action)) {
                int id = Integer.parseInt(request.getParameter("id"));
                categoryService.deleteCategory(id);

            } else if ("update".equals(action)) {
                int id = Integer.parseInt(request.getParameter("id"));
                String name = request.getParameter("name");
                String description = request.getParameter("description");

                Category cat = new Category(id, name, description);
                categoryService.updateCategory(cat);
            }
        } catch (SQLException e) {
            throw new ServletException(e);
        }

        response.sendRedirect("manageCategories.jsp");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            request.setAttribute("categories", categoryService.getAllCategories());
            request.getRequestDispatcher("/admin/manageCategories.jsp").forward(request, response);
        } catch (SQLException e) {
            throw new ServletException(e);
        }
    }
}
