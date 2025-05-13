package ChillGuy.WatchShop.domain.request;

import ChillGuy.WatchShop.util.constant.BrandOriginEnum;
import ChillGuy.WatchShop.util.constant.CaseMaterialEnum;
import ChillGuy.WatchShop.util.constant.CategoryEnum;
import ChillGuy.WatchShop.util.constant.DesignEnum;
import ChillGuy.WatchShop.util.constant.FaceColorEnum;
import ChillGuy.WatchShop.util.constant.StringMaterialEnum;
import ChillGuy.WatchShop.util.constant.StyleEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "Số lượng tồn kho không được để trống")
    private Integer stockQuantity;

    @NotBlank(message = "Trạng thái sản phẩm không được để trống")
    private String status;

    @NotNull(message = "Thương hiệu không được để trống")
    private Long brandId;

    @NotNull(message = "Loại máy không được để trống")
    private Long machineTypeId;

    @NotNull(message = "Mặt kính không được để trống")
    private Long crystalId;

    @NotNull(message = "Danh mục không được để trống")
    private CategoryEnum category;

    @NotNull(message = "Phong cách không được để trống")
    private StyleEnum style;

    @NotNull(message = "Thiết kế không được để trống")
    private DesignEnum design;

    @NotNull(message = "Màu mặt không được để trống")
    private FaceColorEnum faceColor;

    @NotBlank(message = "Đường kính không được để trống")
    private String diameter;

    @NotNull(message = "Chất liệu dây không được để trống")
    private StringMaterialEnum stringMaterial;

    @NotNull(message = "Chất liệu vỏ không được để trống")
    private CaseMaterialEnum caseMaterial;

    @NotNull(message = "Xuất xứ không được để trống")
    private BrandOriginEnum brandOrigin;
}
