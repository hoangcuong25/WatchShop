package ChillGuy.WatchShop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ChillGuy.WatchShop.domain.Product;
import ChillGuy.WatchShop.domain.request.ProductRequestDTO;
import ChillGuy.WatchShop.service.ProductService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Thêm sản phẩm")
    public ResponseEntity<Product> createProduct(
            @RequestPart("product") @Valid ProductRequestDTO productRequest,
            @RequestPart("images") MultipartFile[] imageFiles) throws ThrowBadReqException {
        try {
            if (imageFiles == null || imageFiles.length == 0) {
                throw new ThrowBadReqException("Vui lòng tải lên ít nhất một hình ảnh sản phẩm");
            }
            Product product = productService.createProduct(productRequest, imageFiles);
            return ResponseEntity.status(HttpStatus.CREATED).body(product);
        } catch (Exception e) {
            throw new ThrowBadReqException(e.getMessage());
        }
    }
}
