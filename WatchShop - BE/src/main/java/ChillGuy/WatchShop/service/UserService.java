package ChillGuy.WatchShop.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import ChillGuy.WatchShop.domain.User;
import ChillGuy.WatchShop.domain.response.ResCreateUserDTO;
import ChillGuy.WatchShop.domain.response.ResLoginDTO;
import ChillGuy.WatchShop.domain.response.ResUserDTO;
import ChillGuy.WatchShop.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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

    public User handleUpdateUser(User userUpdateData, User isUser) {
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

        return userRepository.save(isUser);
    }

    public ResUserDTO convertToResUserDTO(User user) {
        ResUserDTO res = new ResUserDTO();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setGender(user.getGender());
        res.setAddress(user.getAddress());
        res.setAge(user.getAge());
        res.setCreatedAt(user.getCreatedAt());
        res.setUpdatedAt(user.getUpdatedAt());
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

    public ResLoginDTO convertToResLoginUserDTO(User user) {
        ResLoginDTO res = new ResLoginDTO();

        ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin();
        userLogin.setId(user.getId());
        userLogin.setEmail(user.getEmail());
        userLogin.setName(user.getName());
        userLogin.setGender(user.getGender().toString());
        userLogin.setAddress(user.getAddress());
        userLogin.setAge(user.getAge());

        res.setUser(userLogin);

        return res;
    }
}
