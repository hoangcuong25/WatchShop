package ChillGuy.WatchShop.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
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
    @ApiMessage("Register a new user")
    public ResponseEntity<ResCreateUserDTO> register(@Valid @RequestBody User user) throws ThrowBadReqException {
        Boolean isUserExist = userService.isUserExist(user.getEmail());
        if (isUserExist) {
            throw new ThrowBadReqException("User already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.convertToResCreateUserDTO(createdUser));
    }

    @PostMapping("/login")
    @ApiMessage("Login a user")
    public ResponseEntity<ResLoginDTO> login(@Valid @RequestBody ReqLoginDTO loginDto) {
        // Nạp input gồm username/password vào Security
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword());

        // xác thực người dùng => cần viết hàm loadUserByUsername
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // set thông tin người dùng đăng nhập vào context (có thể sử dụng sau này)
        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResLoginDTO res = new ResLoginDTO();
        User currentUserDB = this.userService.getUserByEmail(loginDto.getEmail());
        if (currentUserDB != null) {
            ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(
                    currentUserDB.getId(),
                    currentUserDB.getEmail(),
                    currentUserDB.getName(),
                    currentUserDB.getGender() != null ? currentUserDB.getGender().toString() : null,
                    currentUserDB.getAddress(),
                    currentUserDB.getAge());
            res.setUser(userLogin);
        }

        // create access token
        String access_token = this.securityUtil.createAccessToken(authentication.getName(), res);
        res.setAccessToken(access_token);

        return ResponseEntity.ok().body(res);

        // // create refresh token
        // String refresh_token =
        // this.securityUtil.createRefreshToken(loginDto.getUsername(), res);

        // // update user
        // this.userService.updateUserToken(refresh_token, loginDto.getUsername());

        // // set cookies
        // ResponseCookie resCookies = ResponseCookie
        // .from("refresh_token", refresh_token)
        // .httpOnly(true)
        // .secure(true)
        // .path("/")
        // .maxAge(refreshTokenExpiration)
        // .build();

        // return ResponseEntity.ok()
        // .header(HttpHeaders.SET_COOKIE, resCookies.toString())
        // .body(res);
    }
}
