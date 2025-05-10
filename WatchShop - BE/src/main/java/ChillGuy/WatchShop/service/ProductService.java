package ChillGuy.WatchShop.service;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.repository.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    
}
