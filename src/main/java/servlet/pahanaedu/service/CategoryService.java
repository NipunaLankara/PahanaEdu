package servlet.pahanaedu.service;

import servlet.pahanaedu.dao.CategoryDAO;
import servlet.pahanaedu.dto.CategoryDTO;
import servlet.pahanaedu.mapper.CategoryMapper;
import servlet.pahanaedu.model.Category;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CategoryService {

    private final CategoryDAO categoryDAO = new CategoryDAO();

    public void addCategory(CategoryDTO dto) throws SQLException {
        Category category = CategoryMapper.toEntity(dto);
        categoryDAO.save(category);
    }

    public List<CategoryDTO> getAllCategories() throws SQLException {
        List<Category> categories = categoryDAO.findAll();
        List<CategoryDTO> dtos = new ArrayList<>();
        for (Category c : categories) {
            dtos.add(CategoryMapper.toDTO(c));
        }
        return dtos;
    }

    public void deleteCategory(int id) throws SQLException {
        categoryDAO.delete(id);
    }

    public void updateCategory(CategoryDTO dto) throws SQLException {
        Category category = CategoryMapper.toEntity(dto);
        categoryDAO.update(category);
    }

    public CategoryDTO getCategoryById(int id) throws SQLException {
        Category category = categoryDAO.findById(id);
        return CategoryMapper.toDTO(category);
    }
}
