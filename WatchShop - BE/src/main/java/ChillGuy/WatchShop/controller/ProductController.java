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
import java.util.ArrayList;
import java.util.List;

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
            @RequestParam("images") MultipartFile[] images,
            @RequestParam(value = "mainImageIndex", defaultValue = "0") int mainImageIndex)
            throws ThrowBadReqException {

        // Kiểm tra tên sản phẩm
        if (productService.getProductByName(product.getName())) {
            throw new ThrowBadReqException("Sản phẩm đã tồn tại");
        }

        // Kiểm tra ảnh
        if (images == null || images.length == 0) {
            throw new ThrowBadReqException("Ảnh không được để trống");
        }

        if (mainImageIndex < 0 || mainImageIndex >= images.length) {
            throw new ThrowBadReqException("Vị trí ảnh chính không hợp lệ");
        }

        // Upload ảnh lên Cloudinary và tạo danh sách ảnh
        List<Image> imageEntities = new ArrayList<>();
        try {
            for (int i = 0; i < images.length; i++) {
                String imageUrl = cloudinaryService.uploadFile(images[i]);
                Image imageEntity = new Image();
                imageEntity.setUrl(imageUrl);
                imageEntity.setMain(i == mainImageIndex); // Đánh dấu ảnh chính
                imageEntities.add(imageEntity);
            }
        } catch (Exception e) {
            throw new ThrowBadReqException("Lỗi khi tải lên ảnh: " + e.getMessage());
        }

        // Gán danh sách ảnh cho sản phẩm
        product.setImages(imageEntities);

        // Tạo sản phẩm
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }
}
