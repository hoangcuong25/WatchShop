package ChillGuy.WatchShop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ChillGuy.WatchShop.domain.Brand;
import ChillGuy.WatchShop.service.BrandService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1")
public class BrandController {
    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @PostMapping("/brands")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Create a new brand")
    public ResponseEntity<Brand> createBrand(@Valid @RequestBody Brand brand) throws ThrowBadReqException {

        Boolean isBrand = brandService.findByName(brand.getName());
        if (isBrand) {
            throw new ThrowBadReqException("Brand already exists");
        }

        Brand createdBrand = brandService.createBrand(brand);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBrand);
    }

    @GetMapping("/brands")
    @ApiMessage("Get all brands")
    public ResponseEntity<List<Brand>> getAllBrands() {
        List<Brand> brands = brandService.getAllBrands();
        return ResponseEntity.ok(brands);
    }

    @DeleteMapping("/brands/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Delete a brand")
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) throws ThrowBadReqException {
        brandService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/brands")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Update a brand")
    public ResponseEntity<Brand> updateBrand(@RequestBody Brand brand) throws ThrowBadReqException {

        Brand currentBrand = brandService.findById(brand.getId());
        if (currentBrand == null) {
            throw new ThrowBadReqException("Brand not found");
        }

        Brand updatedBrand = brandService.updateBrand(currentBrand, brand);
        return ResponseEntity.ok(updatedBrand);
    }
}
