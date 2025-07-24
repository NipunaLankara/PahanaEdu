package servlet.pahanaedu.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

    private static final String URL = "jdbc:mysql://localhost:3306/pahanaedu";
    private static final String USER = "root";
    private static final String PASSWORD = "mysql7678";
    private static final String DRIVER = "com.mysql.cj.jdbc.Driver"; // Updated Driver Class

    static {
        try {
            Class.forName(DRIVER);  // Load MySQL Driver
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Failed to load MySQL Driver", e);
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
