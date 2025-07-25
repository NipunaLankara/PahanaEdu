package servlet.pahanaedu.servlet.admin;

import servlet.pahanaedu.model.Book;
import servlet.pahanaedu.model.Category;
import servlet.pahanaedu.model.User;
import servlet.pahanaedu.service.BookService;
import servlet.pahanaedu.service.CategoryService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/admin/manageBook")
public class ManageBook extends HttpServlet {
    private final BookService bookService = new BookService();
    private final CategoryService categoryService = new CategoryService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession();
        User loggedInUser = (User) session.getAttribute("loggedInUser");

        if (loggedInUser == null || !"ADMIN".equalsIgnoreCase(loggedInUser.getRole())) {
            response.sendRedirect("../login.jsp");
            return;
        }

        String action = request.getParameter("action");

        try {
            if ("add".equals(action)) {
                String title = request.getParameter("title");
                String author = request.getParameter("author");
                double price = Double.parseDouble(request.getParameter("price"));
                int quantity = Integer.parseInt(request.getParameter("quantity"));
                int categoryId = Integer.parseInt(request.getParameter("categoryId"));

                Book book = new Book(title, author, price, quantity, categoryId);
                bookService.addBook(book);
                session.setAttribute("successMessage", "Book added successfully!");
            } else if ("delete".equals(action)) {
                int id = Integer.parseInt(request.getParameter("id"));
                bookService.deleteBook(id);
                session.setAttribute("successMessage", "Book deleted successfully!");
            } else if ("update".equals(action)) {
                int id = Integer.parseInt(request.getParameter("id"));
                String title = request.getParameter("title");
                String author = request.getParameter("author");
                double price = Double.parseDouble(request.getParameter("price"));
                int quantity = Integer.parseInt(request.getParameter("quantity"));
                int categoryId = Integer.parseInt(request.getParameter("categoryId"));

                Book book = new Book(id, title, author, price, quantity, categoryId);
                bookService.updateBook(book);
                session.setAttribute("successMessage", "Book updated successfully!");
            }
        } catch (SQLException e) {
            session.setAttribute("errorMessage", "Database error: " + e.getMessage());
        }

        response.sendRedirect("manageBook");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        User loggedInUser = (User) session.getAttribute("loggedInUser");

        if (loggedInUser == null || !"ADMIN".equalsIgnoreCase(loggedInUser.getRole())) {
            response.sendRedirect("../login.jsp");
            return;
        }

        String editId = request.getParameter("edit");

        try {
            if (editId != null) {

                int id = Integer.parseInt(editId);
                Book book = bookService.getBookById(id);
                List<Category> categories = categoryService.getAllCategories();

                request.setAttribute("book", book);
                request.setAttribute("categories", categories);
                request.getRequestDispatcher("/admin/editBook.jsp").forward(request, response);
            } else {
                // Default case: show manageBook.jsp
                List<Book> books = bookService.getAllBooks();
                List<Category> categories = categoryService.getAllCategories();
                request.setAttribute("books", books);
                request.setAttribute("categories", categories);
                request.getRequestDispatcher("/admin/manageBook.jsp").forward(request, response);
            }
        } catch (SQLException e) {
            throw new ServletException("Error fetching book or category data", e);
        }
    }

}
