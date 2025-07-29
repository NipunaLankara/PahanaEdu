package servlet.pahanaedu.mapper;

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
}
