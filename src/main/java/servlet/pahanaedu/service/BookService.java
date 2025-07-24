package servlet.pahanaedu.service;

import servlet.pahanaedu.db.DBConnection;
import servlet.pahanaedu.model.Book;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BookService {
    public void addBook(Book book) throws SQLException {
        Connection conn = DBConnection.getConnection();
        String sql = "INSERT INTO book (title, author, price, quantity, category_id) VALUES (?, ?, ?, ?, ?)";
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, book.getTitle());
        stmt.setString(2, book.getAuthor());
        stmt.setDouble(3, book.getPrice());
        stmt.setInt(4, book.getQuantity());
        stmt.setInt(5, book.getCategoryId());
        stmt.executeUpdate();
    }

    public void deleteBook(int id) throws SQLException {
        Connection conn = DBConnection.getConnection();
        String sql = "DELETE FROM book WHERE id=?";
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, id);
        stmt.executeUpdate();
    }

    public void updateBook(Book book) throws SQLException {
        Connection conn = DBConnection.getConnection();
        String sql = "UPDATE book SET title=?, author=?, price=?, quantity=?, category_id=? WHERE id=?";
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, book.getTitle());
        stmt.setString(2, book.getAuthor());
        stmt.setDouble(3, book.getPrice());
        stmt.setInt(4, book.getQuantity());
        stmt.setInt(5, book.getCategoryId());
        stmt.setInt(6, book.getId());
        stmt.executeUpdate();
    }

    public List<Book> getAllBooks() throws SQLException {
        List<Book> list = new ArrayList<>();
        Connection conn = DBConnection.getConnection();
        String sql = "SELECT * FROM book";
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(sql);

        while (rs.next()) {
            Book b = new Book(
                    rs.getInt("id"),
                    rs.getString("title"),
                    rs.getString("author"),
                    rs.getDouble("price"),
                    rs.getInt("quantity"),
                    rs.getInt("category_id")
            );
            list.add(b);
        }

        return list;
    }

    public Book getBookById(int id) throws SQLException {
        Connection conn = DBConnection.getConnection();
        String sql = "SELECT * FROM book WHERE id = ?";
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, id);
        ResultSet rs = stmt.executeQuery();

        if (rs.next()) {
            return new Book(
                    rs.getInt("id"),
                    rs.getString("title"),
                    rs.getString("author"),
                    rs.getDouble("price"),
                    rs.getInt("quantity"),
                    rs.getInt("category_id")
            );
        }

        return null;
    }


}
