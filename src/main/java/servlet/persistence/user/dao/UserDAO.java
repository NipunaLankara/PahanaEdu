package servlet.persistence.user.dao;

import servlet.persistence.db.DBConnection;
import servlet.pahanaedu.user.mapper.UserMapper;
import servlet.pahanaedu.user.model.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {

    public void save(User user) throws SQLException {
        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                     "INSERT INTO user (id, name, address, email, nic, contact_number, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")) {
            stmt.setString(1, user.getId());
            stmt.setString(2, user.getName());
            stmt.setString(3, user.getAddress());
            stmt.setString(4, user.getEmail());
            stmt.setString(5, user.getNic());
            stmt.setString(6, user.getContactNumber());
            stmt.setString(7, user.getPassword());
            stmt.setString(8, user.getRole());
            stmt.executeUpdate();
        }
    }

    public boolean emailExists(String email) throws SQLException {
        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT 1 FROM user WHERE email = ?")) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            return rs.next();
        }
    }

    public boolean phoneExists(String phone) throws SQLException {
        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT 1 FROM user WHERE contact_number = ?")) {
            stmt.setString(1, phone);
            ResultSet rs = stmt.executeQuery();
            return rs.next();
        }
    }

    public List<User> findAllCustomers() throws SQLException {
        List<User> users = new ArrayList<>();
        try (Connection conn =DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM user WHERE role = 'CUSTOMER'");
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                users.add(UserMapper.map(rs));
            }
        }
        return users;
    }

    public User findById(String id) throws SQLException {
        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM user WHERE id = ?")) {
            stmt.setString(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return UserMapper.map(rs);
            }
            return null;
        }
    }

    public User findByEmail(String email) throws SQLException {
        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM user WHERE email = ?")) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return UserMapper.map(rs);
            }
            return null;
        }
    }

    public boolean update(User user) throws SQLException {
        String sql = "UPDATE user SET name=?, address=?, email=?, nic=?, contact_number=? WHERE id=?";
        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, user.getName());
            stmt.setString(2, user.getAddress());
            stmt.setString(3, user.getEmail());
            stmt.setString(4, user.getNic());
            stmt.setString(5, user.getContactNumber());
            stmt.setString(6, user.getId());

            int rows = stmt.executeUpdate();
            return rows > 0;  // ✅ true if at least one row updated
        }
    }


    public boolean delete(String id) throws SQLException {
        String sql = "DELETE FROM user WHERE id = ?";
        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, id);
            int rows = stmt.executeUpdate();
            return rows > 0; // ✅ true if a row was actually deleted
        }
    }


    public String getCustomerIdByEmail(String email) {
        String sql = "SELECT id FROM user WHERE email = ?";
        try (Connection conn = DBConnection.getInstance().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getString("id");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "ERROR";
    }

    public String generateNewUserId() throws SQLException {
        String sql = "SELECT id FROM user ORDER BY id DESC LIMIT 1";
        try (Connection conn = DBConnection.getInstance().getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            if (rs.next()) {
                String lastId = rs.getString("id"); // e.g., "U009"
                int num = Integer.parseInt(lastId.substring(1)) + 1;
                return String.format("U%03d", num);
            } else {
                return "U001";
            }
        }
    }

}










//package servlet.pahanaedu.dao;
//
//import servlet.persistence.db.DBConnection;
//import servlet.pahanaedu.user.mapper.UserMapper;
//import servlet.pahanaedu.user.model.User;
//
//import java.sql.*;
//import java.util.ArrayList;
//import java.util.List;
//
//public class UserDAO {
//
//    public void save(User user) throws SQLException {
//        try (Connection conn = DBConnection.getConnection();
//             PreparedStatement stmt = conn.prepareStatement(
//                     "INSERT INTO user (name, address, email, nic, contact_number, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)")) {
//            stmt.setString(1, user.getName());
//            stmt.setString(2, user.getAddress());
//            stmt.setString(3, user.getEmail());
//            stmt.setString(4, user.getNic());
//            stmt.setString(5, user.getContactNumber());
//            stmt.setString(6, user.getPassword());
//            stmt.setString(7, user.getRole());
//            stmt.executeUpdate();
//        }
//    }
//
//    public boolean emailExists(String email) throws SQLException {
//        try (Connection conn = DBConnection.getConnection();
//             PreparedStatement stmt = conn.prepareStatement("SELECT 1 FROM user WHERE email = ?")) {
//            stmt.setString(1, email);
//            ResultSet rs = stmt.executeQuery();
//            return rs.next();
//        }
//    }
//
//    public boolean phoneExists(String phone) throws SQLException {
//        try (Connection conn = DBConnection.getConnection();
//             PreparedStatement stmt = conn.prepareStatement("SELECT 1 FROM user WHERE contact_number = ?")) {
//            stmt.setString(1, phone);
//            ResultSet rs = stmt.executeQuery();
//            return rs.next();
//        }
//    }
//
//    public List<User> findAllCustomers() throws SQLException {
//        List<User> users = new ArrayList<>();
//        try (Connection conn = DBConnection.getConnection();
//             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM user WHERE role = 'CUSTOMER'");
//             ResultSet rs = stmt.executeQuery()) {
//
//            while (rs.next()) {
//                users.add(UserMapper.map(rs));
//            }
//        }
//        return users;
//    }
//
//    public User findById(int id) throws SQLException {
//        try (Connection conn = DBConnection.getConnection();
//             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM user WHERE id = ?")) {
//            stmt.setInt(1, id);
//            ResultSet rs = stmt.executeQuery();
//            if (rs.next()) {
//                return UserMapper.map(rs);
//            }
//            return null;
//        }
//    }
//
//    public void update(User user) throws SQLException {
//        try (Connection conn = DBConnection.getConnection();
//             PreparedStatement stmt = conn.prepareStatement(
//                     "UPDATE user SET name=?, address=?, email=?, nic=?, contact_number=?, role=? WHERE id=?")) {
//            stmt.setString(1, user.getName());
//            stmt.setString(2, user.getAddress());
//            stmt.setString(3, user.getEmail());
//            stmt.setString(4, user.getNic());
//            stmt.setString(5, user.getContactNumber());
//            stmt.setString(6, user.getRole());
//            stmt.setInt(7, user.getId());
//            stmt.executeUpdate();
//        }
//    }
//
//    public void delete(int id) throws SQLException {
//        try (Connection conn = DBConnection.getConnection();
//             PreparedStatement stmt = conn.prepareStatement("DELETE FROM user WHERE id = ?")) {
//            stmt.setInt(1, id);
//            stmt.executeUpdate();
//        }
//    }
//}
