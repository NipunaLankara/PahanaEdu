package servlet.pahanaedu.user.service;


import org.mindrot.jbcrypt.BCrypt;
import servlet.persistence.user.dao.UserDAO;
import servlet.pahanaedu.user.dto.UserDTO;
import servlet.pahanaedu.user.mapper.UserMapper;
import servlet.pahanaedu.user.model.User;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserService {

    private final UserDAO userDAO = new UserDAO();

    public void registerNewUser(UserDTO dto) throws SQLException {
        // Hash password here
        String hashedPassword = hashPassword(dto.getPassword());

        // Convert DTO to entity
        User user = UserMapper.toEntity(dto);

        user.setPassword(hashedPassword);
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("CUSTOMER");
        }
        // Set generated ID
        String newUserId = userDAO.generateNewUserId();
        user.setId(newUserId);

        userDAO.save(user);
    }

    private String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }

    public boolean checkEmail(String email) throws SQLException {
        return userDAO.emailExists(email);
    }

    public boolean checkPhoneNumber(String contactNumber) throws SQLException {
        return userDAO.phoneExists(contactNumber);
    }

    public List<UserDTO> getAllCustomers() throws SQLException {
        List<User> users = userDAO.findAllCustomers();
        List<UserDTO> dtos = new ArrayList<>();
        for (User user : users) {
            dtos.add(UserMapper.toDTO(user));
        }
        return dtos;
    }

    public UserDTO getUserById(String id) throws SQLException {
        User user = userDAO.findById(id);
        return UserMapper.toDTO(user);
    }

    public UserDTO authenticateUser(String email, String password) throws SQLException {
        User user = userDAO.findByEmail(email);
        if (user != null && org.mindrot.jbcrypt.BCrypt.checkpw(password, user.getPassword())) {
            return UserMapper.toDTO(user);
        }
        return null;
    }

    public void updateUser(UserDTO userDTO) throws SQLException {
        User user = UserMapper.toEntity(userDTO);
        userDAO.update(user);
    }

    public void deleteUserById(String id) throws SQLException {
        userDAO.delete(id);
    }
}
