package ChillGuy.WatchShop.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ChillGuy.WatchShop.domain.Image;
import ChillGuy.WatchShop.domain.Product;
import ChillGuy.WatchShop.repository.ImageRepository;
import ChillGuy.WatchShop.repository.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;

    public ProductService(ProductRepository productRepository, ImageRepository imageRepository) {
        this.productRepository = productRepository;
        this.imageRepository = imageRepository;
    }

    public Boolean getProductByName(String name) {
        return productRepository.existsByName(name);
    }

    @Transactional
    public Product createProduct(Product product) {
        // Lưu sản phẩm trước
        Product createdProduct = productRepository.save(product);

        // Lưu các ảnh và gán sản phẩm cho mỗi ảnh
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            for (Image image : product.getImages()) {
                image.setProduct(createdProduct);
                imageRepository.save(image);
            }
        }

        return createdProduct;
    }
}
