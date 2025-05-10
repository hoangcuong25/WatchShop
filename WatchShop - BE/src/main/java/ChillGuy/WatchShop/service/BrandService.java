package ChillGuy.WatchShop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.domain.Brand;
import ChillGuy.WatchShop.repository.BrandRepository;

@Service
public class BrandService {
    private final BrandRepository brandRepository;

    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    public Boolean findByName(String name) {
        return brandRepository.existsByName(name);
    }

    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }

    public Brand updateBrand(Brand currentBrand, Brand brand) {
        if (brand.getName() != null) {
            currentBrand.setName(brand.getName());
        }

        return brandRepository.save(currentBrand);
    }

    public Brand findById(Long id) {
        return brandRepository.findById(id).orElse(null);
    }
}
