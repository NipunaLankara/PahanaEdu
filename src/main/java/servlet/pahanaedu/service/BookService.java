package servlet.pahanaedu.service;

import servlet.pahanaedu.dao.BookDAO;
import servlet.pahanaedu.dto.BookDTO;
import servlet.pahanaedu.mapper.BookMapper;
import servlet.pahanaedu.model.Book;

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
