package ChillGuy.WatchShop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.domain.Category;
import ChillGuy.WatchShop.repository.CategoryRepository;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(Category category) throws ThrowBadReqException {

        if (categoryRepository.existsByName(category.getName())) {
            throw new ThrowBadReqException("Category already exists");
        }
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    public Category updateCategory(Category category) throws ThrowBadReqException {
        if (!categoryRepository.existsById(category.getId())) {
            throw new ThrowBadReqException("Category not found");
        }
        return categoryRepository.save(category);
    }
}
