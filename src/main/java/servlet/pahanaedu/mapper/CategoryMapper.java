package servlet.pahanaedu.mapper;

import servlet.pahanaedu.dto.CategoryDTO;
import servlet.pahanaedu.model.Category;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CategoryMapper {
    public static Category map(ResultSet rs) throws SQLException {
        return new Category.Builder()
                .id(rs.getInt("id"))
                .name(rs.getString("name"))
                .description(rs.getString("description"))
                .build();
    }

    public static Category toEntity(CategoryDTO dto) {
        if (dto == null) return null;

        return new Category.Builder()
                .id(dto.getId())
                .name(dto.getName())
                .description(dto.getDescription())
                .build();
    }

    public static CategoryDTO toDTO(Category entity) {
        if (entity == null) return null;

        return new CategoryDTO(
                entity.getId(),
                entity.getName(),
                entity.getDescription()
        );
    }
}
