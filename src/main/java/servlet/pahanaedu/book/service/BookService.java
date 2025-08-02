package servlet.pahanaedu.book.service;

import servlet.persistence.book.dao.BookDAO;
import servlet.pahanaedu.book.dto.BookDTO;
import servlet.pahanaedu.book.mapper.BookMapper;
import servlet.pahanaedu.book.model.Book;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BookService {

    private final BookDAO bookDAO = new BookDAO();

    public void addBook(BookDTO dto) throws SQLException {
        bookDAO.save(BookMapper.toEntity(dto));
    }

    public void deleteBook(int id) throws SQLException {
        bookDAO.delete(id);
    }

    public void updateBook(BookDTO dto) throws SQLException {
        bookDAO.update(BookMapper.toEntity(dto));
    }

    public List<BookDTO> getAllBooks() throws SQLException {
        List<Book> books = bookDAO.findAll();
        List<BookDTO> dtos = new ArrayList<>();
        for (Book book : books) {
            dtos.add(BookMapper.toDTO(book));
        }
        return dtos;
    }

    public BookDTO getBookById(int id) throws SQLException {
        Book book = bookDAO.findById(id);
        return book != null ? BookMapper.toDTO(book) : null;
    }
}
