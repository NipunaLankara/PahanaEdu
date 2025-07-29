package servlet.pahanaedu.mapper;

import servlet.pahanaedu.dto.UserDTO;
import servlet.pahanaedu.model.User;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper {
    public static User map(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setName(rs.getString("name"));
        user.setAddress(rs.getString("address"));
        user.setEmail(rs.getString("email"));
        user.setNic(rs.getString("nic"));
        user.setContactNumber(rs.getString("contact_number"));
        user.setRole(rs.getString("role"));
        user.setPassword(rs.getString("password"));
        return user;
    }


    public static UserDTO toDTO(User user) {
        if (user == null) return null;

        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setAddress(user.getAddress());
        dto.setEmail(user.getEmail());
        dto.setNic(user.getNic());
        dto.setContactNumber(user.getContactNumber());
        dto.setRole(user.getRole());
        return dto;
    }

    public static User toEntity(UserDTO dto) {
        if (dto == null) return null;

        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setAddress(dto.getAddress());
        user.setEmail(dto.getEmail());
        user.setNic(dto.getNic());
        user.setContactNumber(dto.getContactNumber());
        user.setRole(dto.getRole());
        user.setPassword(dto.getPassword());

        return user;
    }

//    mlnln
}
