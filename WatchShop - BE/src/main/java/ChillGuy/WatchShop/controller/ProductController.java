package ChillGuy.WatchShop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ChillGuy.WatchShop.domain.Image;
import ChillGuy.WatchShop.domain.Product;
import ChillGuy.WatchShop.service.CloudinaryService;
import ChillGuy.WatchShop.service.ProductService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class ProductController {

    private final ProductService productService;
    private final CloudinaryService cloudinaryService;

    public ProductController(ProductService productService, CloudinaryService cloudinaryService) {
        this.productService = productService;
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Thêm sản phẩm")
    public ResponseEntity<Product> createProduct(
            @Valid @RequestBody Product product,
            @RequestParam("images") MultipartFile[] images) throws ThrowBadReqException {

        Boolean isProduct = productService.getProductByName(product.getName());
        if (isProduct) {
            throw new ThrowBadReqException("Sản phẩm đã tồn tại");
        }

        if (images == null) {
            throw new ThrowBadReqException("Ảnh không được để trống");
        }

        try {
            for (MultipartFile image : images) {
                String imageUrl = cloudinaryService.uploadFile(image);
                Image imageEntity = new Image();
                imageEntity.setUrl(imageUrl);
                imageEntity.setProduct(product);
                product.getImages().add(imageEntity);
            }
        } catch (Exception e) {
            throw new ThrowBadReqException("Lỗi khi tải lên ảnh");
        }

        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }
}
