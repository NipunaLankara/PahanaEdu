package servlet.pahanaedu.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

    private static final String URL = "jdbc:mysql://localhost:3306/pahanaedu";
    private static final String USER = "root";
    private static final String PASSWORD = "mysql7678";
    private static final String DRIVER = "com.mysql.cj.jdbc.Driver";

    private static DBConnection instance;
    private Connection connection;

    private DBConnection() {
        try {
            Class.forName(DRIVER);
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static synchronized DBConnection getInstance() {
        if (instance == null) {
            instance = new DBConnection();
        }
        return instance;
    }

    public Connection getConnection() {
        return connection;
    }
}
