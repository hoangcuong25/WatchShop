package ChillGuy.WatchShop.mapper;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ChillGuy.WatchShop.domain.Product;
import ChillGuy.WatchShop.domain.response.ResProductDTO;

@Component
public class ProductMapper {

    public ResProductDTO toDTO(Product product) {
        if (product == null) {
            return null;
        }

        ResProductDTO dto = new ResProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setOldPrice(product.getOldPrice());
        dto.setNewPrice(product.getNewPrice());
        dto.setDiscount(product.getDiscount());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setStatus(product.getStatus());

        // Map brand information
        if (product.getBrand() != null) {
            dto.setBrandId(product.getBrand().getId());
            dto.setBrandName(product.getBrand().getName());
        }

        // Map machine type information
        if (product.getMachineType() != null) {
            dto.setMachineTypeId(product.getMachineType().getId());
            dto.setMachineTypeName(product.getMachineType().getName());
        }

        // Map crystal information
        if (product.getCrystal() != null) {
            dto.setCrystalId(product.getCrystal().getId());
            dto.setCrystalName(product.getCrystal().getName());
        }

        // Map product specifications
        dto.setCategory(product.getCategory());
        dto.setStyle(product.getStyle());
        dto.setDesign(product.getDesign());
        dto.setFaceColor(product.getFaceColor());
        dto.setDiameter(product.getDiameter());
        dto.setStringMaterial(product.getStringMaterial());
        dto.setCaseMaterial(product.getCaseMaterial());
        dto.setBrandOrigin(product.getBrandOrigin());

        // Map images
        if (product.getImages() != null) {
            dto.setImageUrls(product.getImages().stream()
                    .map(image -> image.getUrl())
                    .collect(Collectors.toList()));
        }

        // Map audit fields
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());
        dto.setCreatedBy(product.getCreatedBy());
        dto.setUpdatedBy(product.getUpdatedBy());

        return dto;
    }
}