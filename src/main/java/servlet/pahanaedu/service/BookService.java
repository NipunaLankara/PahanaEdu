package servlet.pahanaedu.service;

import servlet.pahanaedu.dao.BookDAO;
import servlet.pahanaedu.model.Book;

import java.sql.SQLException;
import java.util.List;

public class BookService {

    private final BookDAO bookDAO = new BookDAO();

    public void addBook(Book book) throws SQLException {
        bookDAO.save(book);
    }

    public void deleteBook(int id) throws SQLException {
        bookDAO.delete(id);
    }

    public void updateBook(Book book) throws SQLException {
        bookDAO.update(book);
    }

    public List<Book> getAllBooks() throws SQLException {
        return bookDAO.findAll();
    }

    public Book getBookById(int id) throws SQLException {
        return bookDAO.findById(id);
    }
}
