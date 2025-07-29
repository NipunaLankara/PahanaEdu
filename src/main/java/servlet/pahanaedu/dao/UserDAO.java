package servlet.pahanaedu.dao;

import servlet.pahanaedu.db.DBConnection;
import servlet.pahanaedu.mapper.UserMapper;
import servlet.pahanaedu.model.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {

    public void save(User user) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                     "INSERT INTO user (name, address, email, nic, contact_number, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)")) {
            stmt.setString(1, user.getName());
            stmt.setString(2, user.getAddress());
            stmt.setString(3, user.getEmail());
            stmt.setString(4, user.getNic());
            stmt.setString(5, user.getContactNumber());
            stmt.setString(6, user.getPassword());
            stmt.setString(7, user.getRole());
            stmt.executeUpdate();
        }
    }

    public boolean emailExists(String email) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT 1 FROM user WHERE email = ?")) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            return rs.next();
        }
    }

    public boolean phoneExists(String phone) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT 1 FROM user WHERE contact_number = ?")) {
            stmt.setString(1, phone);
            ResultSet rs = stmt.executeQuery();
            return rs.next();
        }
    }

    public List<User> findAllCustomers() throws SQLException {
        List<User> users = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM user WHERE role = 'CUSTOMER'");
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                users.add(UserMapper.map(rs));
            }
        }
        return users;
    }

    public User findById(int id) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM user WHERE id = ?")) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return UserMapper.map(rs);
            }
            return null;
        }
    }

    public User findByEmail(String email) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM user WHERE email = ?")) {
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return UserMapper.map(rs);
            }
            return null;
        }
    }

    public void update(User user) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                     "UPDATE user SET name=?, address=?, email=?, nic=?, contact_number=?, role=? WHERE id=?")) {
            stmt.setString(1, user.getName());
            stmt.setString(2, user.getAddress());
            stmt.setString(3, user.getEmail());
            stmt.setString(4, user.getNic());
            stmt.setString(5, user.getContactNumber());
            stmt.setString(6, user.getRole());
            stmt.setInt(7, user.getId());
            stmt.executeUpdate();
        }
    }

    public void delete(int id) throws SQLException {
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement("DELETE FROM user WHERE id = ?")) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }
}










//package servlet.pahanaedu.dao;
//
//import servlet.pahanaedu.db.DBConnection;
//import servlet.pahanaedu.mapper.UserMapper;
//import servlet.pahanaedu.model.User;
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
