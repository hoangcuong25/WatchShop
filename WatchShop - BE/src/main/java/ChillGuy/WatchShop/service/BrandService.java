package ChillGuy.WatchShop.service;

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
}
