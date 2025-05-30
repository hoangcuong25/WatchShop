package ChillGuy.WatchShop.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ChillGuy.WatchShop.domain.Product;
import ChillGuy.WatchShop.domain.request.ProductRequestDTO;
import ChillGuy.WatchShop.domain.response.ResProductDTO;
import ChillGuy.WatchShop.mapper.ProductMapper;
import ChillGuy.WatchShop.service.ProductService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;

    public ProductController(ProductService productService, ProductMapper productMapper) {
        this.productService = productService;
        this.productMapper = productMapper;
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

    @GetMapping("/products")
    @ApiMessage("Lấy danh sách sản phẩm")
    public ResponseEntity<Page<ResProductDTO>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort.Direction sortDirection = Sort.Direction.fromString(direction.toUpperCase());
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

        Page<Product> productPage = productService.getAllProducts(pageable);
        Page<ResProductDTO> productDTOPage = productPage.map(productMapper::toDTO);

        return ResponseEntity.ok(productDTOPage);
    }

    @GetMapping("/products/{id}")
    @ApiMessage("Lấy sản phẩm theo id")
    public ResponseEntity<ResProductDTO> getProductById(@PathVariable Long id) throws ThrowBadReqException {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(productMapper.toDTO(product));
    }

    @DeleteMapping("/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Xóa sản phẩm theo id")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) throws ThrowBadReqException {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // @PutMapping("/products/{id}")
    // @PreAuthorize("hasRole('ADMIN')")
    // @ApiMessage("Cập nhật sản phẩm theo id")
    // public ResponseEntity<Product> updateProduct(
    //         @RequestPart("product") @Valid ProductRequestDTO productRequest,
    //         @RequestPart(value = "images", required = false) MultipartFile[] imageFiles) throws ThrowBadReqException {
    //     try {
    //         Product product = productService.updateProduct(id, productRequest, imageFiles);
    //         return ResponseEntity.ok(product);
    //     } catch (Exception e) {
    //         throw new ThrowBadReqException(e.getMessage());
    //     }
    // }
}
