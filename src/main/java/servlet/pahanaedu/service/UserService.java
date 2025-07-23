package servlet.pahanaedu.service;

import servlet.pahanaedu.db.DBConnection;
import servlet.pahanaedu.model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserService {

    public void registerNewUser(User user) throws SQLException {

        Connection connection = DBConnection.getConnection();
        try (PreparedStatement preparedStatement = connection.prepareStatement(
                "INSERT INTO user (name, address, email, nic, phone_number, password,role) VALUES (?, ?, ?, ?, ?, ?, ?)")) {
            preparedStatement.setString(1, user.getName());
            preparedStatement.setString(2, user.getAddress());
            preparedStatement.setString(3, user.getEmail());
            preparedStatement.setString(4, user.getNic());
            preparedStatement.setString(5, user.getPhoneNumber());
            preparedStatement.setString(6, user.getPassword());
            preparedStatement.setString(7, user.getRole());

            preparedStatement.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean checkEmail(String email) throws SQLException {
        Connection connection = DBConnection.getConnection();
        String sql =  "SELECT * FROM user WHERE email = ?";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, email);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                return resultSet.getInt(1) > 0;

            }

        }catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean checkPhoneNumber(String contact_number) throws SQLException {
        Connection connection = DBConnection.getConnection();
        String sql =  "SELECT * FROM user WHERE contact_number  = ?";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, contact_number);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                return resultSet.getInt(1) > 0;

            }

        }catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
