package ChillGuy.WatchShop.service;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.repository.BrandRepository;

@Service
public class BrandService {
    private final BrandRepository brandRepository;

    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }
}
