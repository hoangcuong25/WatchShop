package ChillGuy.WatchShop.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ChillGuy.WatchShop.domain.Brand;
import ChillGuy.WatchShop.service.BrandService;
import ChillGuy.WatchShop.service.CloudinaryService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1")
public class BrandController {
    private final BrandService brandService;
    private final CloudinaryService cloudinaryService;

    public BrandController(BrandService brandService, CloudinaryService cloudinaryService) {
        this.brandService = brandService;
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/brands")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Create a new brand")
    public ResponseEntity<Brand> createBrand(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name) throws ThrowBadReqException, IOException {

        Boolean isBrand = brandService.findByName(name);
        if (isBrand) {
            throw new ThrowBadReqException("Thương hiệu đã tồn tại");
        }

        Brand brand = new Brand();
        brand.setName(name);

        try {
            // Upload file to Cloudinary
            String imageUrl = cloudinaryService.uploadFile(file);
            brand.setImage(imageUrl);

            Brand createdBrand = brandService.createBrand(brand);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdBrand);
        } catch (Exception e) {
            throw new ThrowBadReqException("Upload thất bại: " + e.getMessage());
        }
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
        Brand brand = brandService.findById(id);
        if (brand == null) {
            throw new ThrowBadReqException("Thương hiệu không tồn tại");
        }

        try {
            // Delete image from Cloudinary if exists
            if (brand.getImage() != null) {
                cloudinaryService.deleteFile(brand.getImage());
            }
            brandService.deleteBrand(id);
            return ResponseEntity.noContent().build();
        } catch (IOException e) {
            throw new ThrowBadReqException("Xóa hình ảnh thất bại: " + e.getMessage());
        }
    }

    @PutMapping("/brands/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Update a brand")
    public ResponseEntity<Brand> updateBrand(
            @PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("name") String name) throws ThrowBadReqException {

        Brand currentBrand = brandService.findById(id);
        if (currentBrand == null) {
            throw new ThrowBadReqException("Thương hiệu không tồn tại");
        }

        Brand brand = new Brand();
        brand.setName(name);

        if (file != null) {
            try {
                // Delete old image from Cloudinary if exists
                if (currentBrand.getImage() != null) {
                    cloudinaryService.deleteFile(currentBrand.getImage());
                }
                // Upload new image
                String imageUrl = cloudinaryService.uploadFile(file);
                brand.setImage(imageUrl);
            } catch (IOException e) {
                throw new ThrowBadReqException("Upload thất bại: " + e.getMessage());
            }
        }

        Brand updatedBrand = brandService.updateBrand(currentBrand, brand);
        return ResponseEntity.ok(updatedBrand);
    }
}
