package ChillGuy.WatchShop.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ChillGuy.WatchShop.domain.User;
import ChillGuy.WatchShop.domain.request.ReqLoginDTO;
import ChillGuy.WatchShop.domain.response.ResCreateUserDTO;
import ChillGuy.WatchShop.domain.response.ResLoginDTO;
import ChillGuy.WatchShop.service.UserService;
import ChillGuy.WatchShop.util.annotation.ApiMessage;
import ChillGuy.WatchShop.util.error.ThrowBadReqException;
import ChillGuy.WatchShop.util.SecurityUtil;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityUtil securityUtil;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            UserService userService,
            PasswordEncoder passwordEncoder,
            AuthenticationManagerBuilder authenticationManagerBuilder,
            SecurityUtil securityUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityUtil = securityUtil;
    }

    @PostMapping("/register")
    @ApiMessage("Tạo người dùng mới")
    public ResponseEntity<ResCreateUserDTO> register(@Valid @RequestBody User user) throws ThrowBadReqException {
        Boolean isUserExist = userService.isUserExist(user.getEmail());
        if (isUserExist) {
            throw new ThrowBadReqException("Người dùng đã tồn tại");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.convertToResCreateUserDTO(createdUser));
    }

    private ResLoginDTO.UserLogin convertToUserLogin(User user) {
        if (user == null) {
            return null;
        }
        return new ResLoginDTO.UserLogin(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getGender() != null ? user.getGender().toString() : null,
                user.getAddress(),
                user.getAge());
    }

    @PostMapping("/login")
    @ApiMessage("Đăng nhập")
    public ResponseEntity<ResLoginDTO> login(@Valid @RequestBody ReqLoginDTO loginDto) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResLoginDTO res = new ResLoginDTO();
        User currentUserDB = this.userService.getUserByEmail(loginDto.getEmail());
        res.setUser(convertToUserLogin(currentUserDB));

        String access_token = this.securityUtil.createAccessToken(authentication.getName(), res);
        res.setAccessToken(access_token);

        return ResponseEntity.ok().body(res);
    }
}
