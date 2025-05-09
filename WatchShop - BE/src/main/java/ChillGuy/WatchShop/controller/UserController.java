package ChillGuy.WatchShop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import ChillGuy.WatchShop.domain.User;
import ChillGuy.WatchShop.domain.response.ResUserDTO;
import ChillGuy.WatchShop.service.UserService;
import ChillGuy.WatchShop.service.CloudinaryService;
import ChillGuy.WatchShop.util.SecurityUtil;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;
import ChillGuy.WatchShop.util.constant.RoleEnum;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;
    private final CloudinaryService cloudinaryService;

    public UserController(UserService userService, CloudinaryService cloudinaryService) {
        this.userService = userService;
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/users")
    @ApiMessage("Tạo người dùng mới")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) throws ThrowBadReqException {
        Boolean isUserExist = userService.isUserExist(user.getEmail());
        if (isUserExist) {
            throw new ThrowBadReqException("Người dùng đã tồn tại");
        }

        // Set default role for new user
        user.setRole(RoleEnum.USER);

        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping("/users")
    @ApiMessage("Lấy thông tin người dùng")
    public ResponseEntity<ResUserDTO> getUserById() throws ThrowBadReqException {
        String email = SecurityUtil.getCurrentUserLogin()
                .orElseThrow(() -> new ThrowBadReqException("Không tìm thấy người dùng"));

        User user = userService.getUserByEmail(email);
        if (user == null) {
            throw new ThrowBadReqException("Không tìm thấy người dùng");
        }

        return ResponseEntity.ok(userService.convertToResUserDTO(user));
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiMessage("Xóa người dùng")
    public ResponseEntity<Void> deleteUserById(@PathVariable("id") long id)
            throws ThrowBadReqException {
        // Check if current user is admin
        String email = SecurityUtil.getCurrentUserLogin()
                .orElseThrow(() -> new ThrowBadReqException("Không tìm thấy người dùng"));

        User user = this.userService.getUserById(id);
        if (user == null) {
            throw new ThrowBadReqException("Người dùng không tồn tại");
        }

        this.userService.handleDeleteUser(id);

        return ResponseEntity.ok(null);
    }

    @PutMapping("/users")
    @ApiMessage("Cập nhật thông tin người dùng")
    public ResponseEntity<ResUserDTO> updateUser(@RequestBody User userUpdateData)
            throws ThrowBadReqException {
        String email = SecurityUtil.getCurrentUserLogin()
                .orElseThrow(() -> new ThrowBadReqException("Không tìm thấy người dùng"));

        User currentUser = userService.getUserByEmail(email);
        if (currentUser == null) {
            throw new ThrowBadReqException("Không tìm thấy người dùng");
        }

        // Prevent role update unless user is admin
        if (userUpdateData.getRole() != null && userUpdateData.getRole() != currentUser.getRole()) {
            if (currentUser.getRole() != RoleEnum.ADMIN) {
                throw new ThrowBadReqException("Không có quyền thay đổi role");
            }
        }

        User updatedUser = this.userService.handleUpdateUser(userUpdateData, currentUser);

        if (updatedUser == null) {
            throw new ThrowBadReqException("Đã xảy ra lỗi");
        }

        return ResponseEntity.ok(userService.convertToResUserDTO(updatedUser));
    }

    @PutMapping("/users/avatar")
    @ApiMessage("Cập nhật avatar người dùng")
    public ResponseEntity<ResUserDTO> updateAvatar(@RequestParam("file") MultipartFile file)
            throws ThrowBadReqException {
        String email = SecurityUtil.getCurrentUserLogin()
                .orElseThrow(() -> new ThrowBadReqException("Không tìm thấy người dùng"));

        User currentUser = userService.getUserByEmail(email);
        if (currentUser == null) {
            throw new ThrowBadReqException("Không tìm thấy người dùng");
        }

        try {
            // Upload file to Cloudinary
            String imageUrl = cloudinaryService.uploadFile(file);

            // Create update data with new avatar URL
            User updateData = new User();
            updateData.setAvatar(imageUrl);

            // Update user with new avatar
            User updatedUser = userService.handleUpdateUser(updateData, currentUser);

            if (updatedUser == null) {
                throw new ThrowBadReqException("Đã xảy ra lỗi khi cập nhật avatar");
            }

            return ResponseEntity.ok(userService.convertToResUserDTO(updatedUser));
        } catch (Exception e) {
            throw new ThrowBadReqException("Upload avatar thất bại: " + e.getMessage());
        }
    }
}
