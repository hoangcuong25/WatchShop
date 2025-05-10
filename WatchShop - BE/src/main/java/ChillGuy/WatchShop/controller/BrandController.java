package ChillGuy.WatchShop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ChillGuy.WatchShop.domain.Brand;
import ChillGuy.WatchShop.service.BrandService;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class BrandController {
    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @PostMapping("/brands")
    public ResponseEntity<Brand> createBrand(@Valid @RequestBody Brand brand) throws ThrowBadReqException {

        Boolean isBrand = brandService.findByName(brand.getName());
        if (isBrand) {
            throw new ThrowBadReqException("Brand already exists");
        }

        Brand createdBrand = brandService.createBrand(brand);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBrand);
    }

}
