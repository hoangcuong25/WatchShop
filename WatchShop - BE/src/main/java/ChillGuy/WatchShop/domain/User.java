package ChillGuy.WatchShop.domain;

import java.time.Instant;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import ChillGuy.WatchShop.util.SecurityUtil;
import ChillGuy.WatchShop.util.constant.GenderEnum;
import ChillGuy.WatchShop.util.constant.RoleEnum;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    private static final String DEFAULT_AVATAR_URL = "https://res.cloudinary.com/dtaawt3ej/image/upload/v1706880635/default-avatar.jpg";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Name không được để trống")
    private String name;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;

    @NotBlank(message = "Password không được để trống")
    @Size(min = 8, message = "Password phải có ít nhất 8 ký tự")
    private String password;

    private int age;

    @Enumerated(EnumType.STRING)
    private GenderEnum gender;

    private String address;

    private String avatar;

    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(20) default 'USER'")
    private RoleEnum role = RoleEnum.USER;

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

        if (this.role == null) {
            this.role = RoleEnum.USER;
        }

        if (this.avatar == null) {
            this.avatar = DEFAULT_AVATAR_URL;
        }
    }

    @PreUpdate
    public void handleBeforeUpdate() {
        this.updatedBy = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";

        this.updatedAt = Instant.now();
    }
}
