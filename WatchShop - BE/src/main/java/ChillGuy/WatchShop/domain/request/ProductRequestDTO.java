package ChillGuy.WatchShop.domain.request;

import ChillGuy.WatchShop.util.constant.BrandOriginEnum;
import ChillGuy.WatchShop.util.constant.CaseMaterialEnum;
import ChillGuy.WatchShop.util.constant.CategoryEnum;
import ChillGuy.WatchShop.util.constant.DesignEnum;
import ChillGuy.WatchShop.util.constant.FaceColorEnum;
import ChillGuy.WatchShop.util.constant.StringMaterialEnum;
import ChillGuy.WatchShop.util.constant.StyleEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDTO {
    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String name;

    @NotBlank(message = "Mô tả sản phẩm không được để trống")
    private String description;

    @NotBlank(message = "Giá cũ không được để trống")
    private String oldPrice;

    @NotBlank(message = "Giá mới không được để trống")
    private String newPrice;

    @NotBlank(message = "Giảm giá không được để trống")
    private String discount;

    @NotBlank(message = "Số lượng tồn kho không được để trống")
    private Integer stockQuantity;

    @NotBlank(message = "Trạng thái sản phẩm không được để trống")
    private String status;

    private Long brandId;
    private Long machineTypeId;
    private Long crystalId;
    private CategoryEnum category;
    private StyleEnum style;
    private DesignEnum design;
    private FaceColorEnum faceColor;
    private String diameter;
    private StringMaterialEnum stringMaterial;
    private CaseMaterialEnum caseMaterial;
    private BrandOriginEnum brandOrigin;
}
