package ChillGuy.WatchShop.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.domain.BrandOrigins;
import ChillGuy.WatchShop.repository.BrandOriginsRepository;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@Service
public class BrandOriginsService {
    private final BrandOriginsRepository brandOriginsRepository;

    public BrandOriginsService(BrandOriginsRepository brandOriginsRepository) {
        this.brandOriginsRepository = brandOriginsRepository;
    }

    public BrandOrigins createBrandOrigins(BrandOrigins brandOrigins) throws ThrowBadReqException {
        if (brandOriginsRepository.existsByName(brandOrigins.getName())) {
            throw new ThrowBadReqException("Brand origin already exists");
        }
        return brandOriginsRepository.save(brandOrigins);
    }

    public List<BrandOrigins> getAllBrandOrigins() {
        return brandOriginsRepository.findAll();
    }

    public void deleteBrandOrigins(Long id) {
        brandOriginsRepository.deleteById(id);
    }

    public BrandOrigins updateBrandOrigins(BrandOrigins brandOrigins) {
        if (brandOrigins.getName() != null) {
            brandOrigins.setName(brandOrigins.getName());
        }

        return brandOriginsRepository.save(brandOrigins);
    }
}