package ChillGuy.WatchShop.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
}