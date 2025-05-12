package ChillGuy.WatchShop.service;

import org.springframework.stereotype.Service;

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

    public Product createProduct(Product product) {
        Product createdProduct = productRepository.save(product);
        if (product.getImages() != null) {
            for (Image image : product.getImages()) {
                image.setProduct(createdProduct);
                imageRepository.save(image);
            }
        }
        return createdProduct;
    }
}
