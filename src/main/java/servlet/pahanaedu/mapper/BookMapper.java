package servlet.pahanaedu.mapper;

import servlet.pahanaedu.dto.BookDTO;
import servlet.pahanaedu.model.Book;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BookMapper {
    public static Book map(ResultSet rs) throws SQLException {
        return new Book(
                rs.getInt("id"),
                rs.getString("title"),
                rs.getString("author"),
                rs.getDouble("price"),
                rs.getInt("quantity"),
                rs.getInt("category_id")
        );
    }

    public static Book toEntity(BookDTO dto) {
        return new Book(
                dto.getId(),
                dto.getTitle(),
                dto.getAuthor(),
                dto.getPrice(),
                dto.getQuantity(),
                dto.getCategoryId()
        );
    }

    public static BookDTO toDTO(Book book) {
        return new BookDTO(
                book.getId(),
                book.getTitle(),
                book.getAuthor(), book.getPrice(),
                book.getQuantity(),
                book.getCategoryId()
        );
    }
}
