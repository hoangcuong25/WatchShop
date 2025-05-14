package ChillGuy.WatchShop.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ChillGuy.WatchShop.domain.User;
import ChillGuy.WatchShop.domain.response.ResCreateUserDTO;
import ChillGuy.WatchShop.domain.response.ResLoginDTO;
import ChillGuy.WatchShop.domain.response.ResUserDTO;
import ChillGuy.WatchShop.repository.UserRepository;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RedisService redisService;
    private final CloudinaryService cloudinaryService;

    public UserService(UserRepository userRepository, RedisService redisService, CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
        this.userRepository = userRepository;
        this.redisService = redisService;
    }

    public Boolean isUserExist(String email) {
        return userRepository.existsByEmail(email);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            return null;
        }
        return user.get();
    }

    public void handleDeleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User handleUpdateUser(User userUpdateData, MultipartFile file, User isUser)
            throws Exception {
        if (userUpdateData == null) {
            return null;
        }

        if (userUpdateData.getAddress() != null) {
            isUser.setAddress(userUpdateData.getAddress());
        }
        if (userUpdateData.getGender() != null) {
            isUser.setGender(userUpdateData.getGender());
        }
        if (userUpdateData.getAge() > 0) {
            isUser.setAge(userUpdateData.getAge());
        }
        if (userUpdateData.getName() != null) {
            isUser.setName(userUpdateData.getName());
        }

        String phoneStr = String.valueOf(userUpdateData.getPhone());
        if (phoneStr.length() == 10) {
            isUser.setPhone(phoneStr);
        } else {
            throw new ThrowBadReqException("Số điện thoại không hợp lệ");
        }

        if (file != null && !file.isEmpty()) {
            String imageUrl = cloudinaryService.uploadFile(file);
            isUser.setAvatar(imageUrl);
        }

        return userRepository.save(isUser);
    }

    public User getUserByRefreshTokenAndEmail(String refreshToken, String email) {
        // Kiểm tra refresh token trong Redis
        String storedToken = redisService.getRefreshToken(email);
        if (storedToken == null || !storedToken.equals(refreshToken)) {
            return null;
        }
        return userRepository.findByEmail(email);
    }

    public ResUserDTO convertToResUserDTO(User user) {
        ResUserDTO res = new ResUserDTO();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setGender(user.getGender());
        res.setAddress(user.getAddress());
        res.setAge(user.getAge());
        res.setUpdatedAt(user.getUpdatedAt());
        res.setAvatar(user.getAvatar());
        res.setPhone(user.getPhone());
        res.setRole(user.getRole().toString());
        return res;
    }

    public ResCreateUserDTO convertToResCreateUserDTO(User user) {
        ResCreateUserDTO res = new ResCreateUserDTO();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setGender(user.getGender());
        res.setAddress(user.getAddress());
        res.setAge(user.getAge());
        res.setCreatedAt(user.getCreatedAt());
        return res;
    }

    public ResLoginDTO.UserLogin convertToResLoginUserDTO(User user) {
        ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin();
        userLogin.setId(user.getId());
        userLogin.setEmail(user.getEmail());
        userLogin.setName(user.getName());
        userLogin.setGender(user.getGender() != null ? user.getGender().toString() : null);
        userLogin.setAddress(user.getAddress());
        userLogin.setAge(user.getAge());
        userLogin.setAvatar(user.getAvatar());
        userLogin.setPhone(user.getPhone());
        userLogin.setRole(user.getRole());

        return userLogin;
    }
}
