package ChillGuy.WatchShop.domain;

import java.time.Instant;

import ChillGuy.WatchShop.util.SecurityUtil;
import ChillGuy.WatchShop.util.constant.BrandOriginEnum;
import ChillGuy.WatchShop.util.constant.CaseMaterialEnum;
import ChillGuy.WatchShop.util.constant.CategoryEnum;
import ChillGuy.WatchShop.util.constant.DesignEnum;
import ChillGuy.WatchShop.util.constant.FaceColorEnum;
import ChillGuy.WatchShop.util.constant.StringMaterialEnum;
import ChillGuy.WatchShop.util.constant.StyleEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name không được để trống")
    private String name;

    @NotBlank(message = "Description không được để trống")
    private String description;

    @NotBlank(message = "Old Price không được để trống")
    private String oldPrice;

    @NotBlank(message = "New Price không được để trống")
    private String newPrice;

    @NotBlank(message = "Discount không được để trống")
    private String discount;

    private Integer stockQuantity;

    @NotBlank(message = "Status không được để trống")
    private String status;

    @NotNull(message = "Brand không được để trống")
    @ManyToOne(fetch = jakarta.persistence.FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @NotNull(message = "Machine Type không được để trống")
    @ManyToOne(fetch = jakarta.persistence.FetchType.LAZY)
    @JoinColumn(name = "machine_type_id", nullable = false)
    private MachineType machineType;

    @NotNull(message = "Category không được để trống")
    private CategoryEnum category;

    @NotNull(message = "Style không được để trống")
    private StyleEnum style;

    @NotNull(message = "Design không được để trống")
    private DesignEnum design;

    @NotNull(message = "Crystal không được để trống")
    private String crystal;

    @NotNull(message = "Face Color không được để trống")
    private FaceColorEnum faceColor;

    @NotNull(message = "Diameter không được để trống")
    private String diameter;

    @NotNull(message = "String Material không được để trống")
    private StringMaterialEnum stringMaterial;

    @NotNull(message = "Case Material không được để trống")
    private CaseMaterialEnum caseMaterial;

    @NotNull(message = "Brand Origin không được để trống")
    private BrandOriginEnum brandOrigin;

    private Instant createdAt;
    private Instant updatedAt;
    private String createdBy;
    private String updatedBy;

    @PrePersist
    public void handleBeforeCreate() {
        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";

        this.createdAt = Instant.now();
    }

    @PreUpdate
    public void handleBeforeUpdate() {
        this.updatedBy = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";

        this.updatedAt = Instant.now();
    }
}