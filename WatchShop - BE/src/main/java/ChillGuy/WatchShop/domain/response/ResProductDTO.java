package ChillGuy.WatchShop.domain.response;

import java.time.Instant;
import java.util.List;

import ChillGuy.WatchShop.util.constant.BrandOriginEnum;
import ChillGuy.WatchShop.util.constant.CaseMaterialEnum;
import ChillGuy.WatchShop.util.constant.CategoryEnum;
import ChillGuy.WatchShop.util.constant.DesignEnum;
import ChillGuy.WatchShop.util.constant.FaceColorEnum;
import ChillGuy.WatchShop.util.constant.StringMaterialEnum;
import ChillGuy.WatchShop.util.constant.StyleEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResProductDTO {
    private Long id;
    private String name;
    private String description;
    private String oldPrice;
    private String newPrice;
    private String discount;
    private Integer stockQuantity;
    private String status;

    // Brand information
    private Long brandId;
    private String brandName;

    // Machine Type information
    private Long machineTypeId;
    private String machineTypeName;

    // Crystal information
    private Long crystalId;
    private String crystalName;

    // Product specifications
    private CategoryEnum category;
    private StyleEnum style;
    private DesignEnum design;
    private FaceColorEnum faceColor;
    private String diameter;
    private StringMaterialEnum stringMaterial;
    private CaseMaterialEnum caseMaterial;
    private BrandOriginEnum brandOrigin;

    // Images
    private List<String> imageUrls;

    // Audit fields
    private Instant createdAt;
    private Instant updatedAt;
    private String createdBy;
    private String updatedBy;
}
