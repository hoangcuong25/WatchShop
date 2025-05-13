package ChillGuy.WatchShop.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ChillGuy.WatchShop.domain.Brand;
import ChillGuy.WatchShop.domain.Crystals;
import ChillGuy.WatchShop.domain.Image;
import ChillGuy.WatchShop.domain.MachineType;
import ChillGuy.WatchShop.domain.Product;
import ChillGuy.WatchShop.domain.request.ProductRequestDTO;
import ChillGuy.WatchShop.repository.BrandRepository;
import ChillGuy.WatchShop.repository.CrystalsRepository;
import ChillGuy.WatchShop.repository.ImageRepository;
import ChillGuy.WatchShop.repository.MachineTypeRepository;
import ChillGuy.WatchShop.repository.ProductRepository;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;
    private final CloudinaryService cloudinaryService;
    private final BrandRepository brandRepository;
    private final MachineTypeRepository machineTypeRepository;
    private final CrystalsRepository crystalsRepository;

    public Boolean getProductByName(String name) {
        return productRepository.existsByName(name);
    }

    public Product createProduct(ProductRequestDTO productRequest, MultipartFile[] imageFiles)
            throws ThrowBadReqException {
        try {
            if (imageFiles == null || imageFiles.length == 0) {
                throw new ThrowBadReqException("Vui lòng tải lên ít nhất một hình ảnh sản phẩm");
            }

            // 1. Lấy đối tượng phụ (brand, machineType, crystal) từ DB
            Brand brand = brandRepository.findById(productRequest.getBrandId())
                    .orElseThrow(() -> new ThrowBadReqException("Không tìm thấy brand"));

            MachineType machineType = machineTypeRepository.findById(productRequest.getMachineTypeId())
                    .orElseThrow(() -> new ThrowBadReqException("Không tìm thấy machineType"));

            Crystals crystal = crystalsRepository.findById(productRequest.getCrystalId())
                    .orElseThrow(() -> new ThrowBadReqException("Không tìm thấy crystal"));

            // 2. Tạo Product entity
            Product product = new Product();
            product.setName(productRequest.getName());
            product.setDescription(productRequest.getDescription());
            product.setOldPrice(productRequest.getOldPrice());
            product.setNewPrice(productRequest.getNewPrice());
            product.setDiscount(productRequest.getDiscount());
            product.setStockQuantity(productRequest.getStockQuantity());
            product.setStatus(productRequest.getStatus());
            product.setBrand(brand);
            product.setMachineType(machineType);
            product.setCategory(productRequest.getCategory());
            product.setStyle(productRequest.getStyle());
            product.setDesign(productRequest.getDesign());
            product.setCrystal(crystal);
            product.setFaceColor(productRequest.getFaceColor());
            product.setDiameter(productRequest.getDiameter());
            product.setStringMaterial(productRequest.getStringMaterial());
            product.setCaseMaterial(productRequest.getCaseMaterial());
            product.setBrandOrigin(productRequest.getBrandOrigin());

            productRepository.save(product); // product giờ đã có ID

            // 3. Upload ảnh lên Cloudinary và lưu vào bảng images
            List<Image> images = new ArrayList<>();
            for (int i = 0; i < imageFiles.length; i++) {
                String url = cloudinaryService.uploadFile(imageFiles[i]);

                Image image = new Image();
                image.setUrl(url);
                image.setProduct(product); // gán FK product_id
                images.add(image);
            }

            imageRepository.saveAll(images);

            return product;

        } catch (Exception e) {
            throw new ThrowBadReqException(e.getMessage());
        }
    }

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }
}
