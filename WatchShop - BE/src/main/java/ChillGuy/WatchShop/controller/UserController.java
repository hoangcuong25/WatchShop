package ChillGuy.WatchShop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import ChillGuy.WatchShop.domain.User;
import ChillGuy.WatchShop.domain.response.ResUserDTO;
import ChillGuy.WatchShop.service.UserService;
import ChillGuy.WatchShop.util.SecurityUtil;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    @ApiMessage("Tạo người dùng mới")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) throws ThrowBadReqException {
        Boolean isUserExist = userService.isUserExist(user.getEmail());
        if (isUserExist) {
            throw new ThrowBadReqException("Người dùng đã tồn tại");
        }

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
    @ApiMessage("Xóa người dùng")
    public ResponseEntity<Void> deleteUserById(@PathVariable("id") long id)
            throws ThrowBadReqException {
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

        User isUser = userService.getUserByEmail(email);
        if (isUser == null) {
            throw new ThrowBadReqException("Không tìm thấy người dùng");
        }
        User updatedUser = this.userService.handleUpdateUser(userUpdateData, isUser);

        if (updatedUser == null) {
            throw new ThrowBadReqException("Đã xảy ra lỗi");
        }

        return ResponseEntity.ok(userService.convertToResUserDTO(updatedUser));
    }

}
