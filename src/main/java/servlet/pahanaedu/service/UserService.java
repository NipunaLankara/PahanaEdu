package servlet.pahanaedu.service;

import servlet.pahanaedu.db.DBConnection;
import servlet.pahanaedu.model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserService {

    public void registerNewUser(User user) throws SQLException {

        Connection connection = DBConnection.getConnection();
        try (PreparedStatement preparedStatement = connection.prepareStatement(
                "INSERT INTO user (name, address, email, nic, contact_number, password,role) VALUES (?, ?, ?, ?, ?, ?, ?)")) {
            preparedStatement.setString(1, user.getName());
            preparedStatement.setString(2, user.getAddress());
            preparedStatement.setString(3, user.getEmail());
            preparedStatement.setString(4, user.getNic());
            preparedStatement.setString(5, user.getContactNumber());
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
//    // Fetch all users
//    public List<User> getAllUsers() throws SQLException {
//        List<User> users = new ArrayList<>();
//        Connection connection = DBConnection.getConnection();
//        String sql = "SELECT * FROM user";
//        PreparedStatement stmt = connection.prepareStatement(sql);
//        ResultSet rs = stmt.executeQuery();
//
//        while (rs.next()) {
//            User user = new User();
//            user.setId(rs.getInt("id"));  // Assuming `id` is the PK
//            user.setName(rs.getString("name"));
//            user.setAddress(rs.getString("address"));
//            user.setEmail(rs.getString("email"));
//            user.setNic(rs.getString("nic"));
//            user.setContactNumber(rs.getString("contact_number"));
//            user.setRole(rs.getString("role"));
//            users.add(user);
//        }
//        return users;
//    }

    // Fetch only users with role = "CUSTOMER"
    public List<User> getAllCustomers() throws SQLException {
        Connection connection = DBConnection.getConnection();

        List<User> users = new ArrayList<>();
        String sql = "SELECT * FROM user WHERE role = ?";
        PreparedStatement stmt = connection.prepareStatement(sql);
        stmt.setString(1, "CUSTOMER");
        ResultSet rs = stmt.executeQuery();

        while (rs.next()) {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setAddress(rs.getString("address"));
            user.setEmail(rs.getString("email"));
            user.setNic(rs.getString("nic"));
            user.setContactNumber(rs.getString("contact_number"));
            user.setRole(rs.getString("role"));
            users.add(user);
        }

        return users;
    }


    // Delete user by ID
    public void deleteUserById(int id) throws SQLException {
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement("DELETE FROM user WHERE id = ?");
        stmt.setInt(1, id);
        stmt.executeUpdate();
    }

    public User getUserById(int id) throws SQLException {
        Connection conn = DBConnection.getConnection();
        String sql = "SELECT * FROM user WHERE id = ?";
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setInt(1, id);
        ResultSet rs = stmt.executeQuery();

        if (rs.next()) {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setAddress(rs.getString("address"));
            user.setEmail(rs.getString("email"));
            user.setNic(rs.getString("nic"));
            user.setContactNumber(rs.getString("contact_number"));
            user.setRole(rs.getString("role"));
            return user;
        }
        return null;
    }


    // Update user
    public void updateUser(User user) throws SQLException {
        Connection conn = DBConnection.getConnection();
        PreparedStatement stmt = conn.prepareStatement(
                "UPDATE user SET name=?, address=?, email=?, nic=?, contact_number=?, role=? WHERE id=?"
        );
        stmt.setString(1, user.getName());
        stmt.setString(2, user.getAddress());
        stmt.setString(3, user.getEmail());
        stmt.setString(4, user.getNic());
        stmt.setString(5, user.getContactNumber());
        stmt.setString(6, user.getRole());
        stmt.setInt(7, user.getId());
        stmt.executeUpdate();
    }

//    public void updateCustomerProfile(User user) throws SQLException {
//        Connection conn = DBConnection.getConnection();
//        PreparedStatement stmt = conn.prepareStatement(
//                "UPDATE user SET name=?, address=?, email=?, nic=?, contact_number=? WHERE id=?"
//        );
//        stmt.setString(1, user.getName());
//        stmt.setString(2, user.getAddress());
//        stmt.setString(3, user.getEmail());
//        stmt.setString(4, user.getNic());
//        stmt.setString(5, user.getContactNumber());
//        stmt.setInt(6, user.getId());
//        stmt.executeUpdate();
//    }


}
