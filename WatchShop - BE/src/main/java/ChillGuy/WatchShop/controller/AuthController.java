package ChillGuy.WatchShop.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ChillGuy.WatchShop.domain.User;
import ChillGuy.WatchShop.domain.request.ReqLoginDTO;
import ChillGuy.WatchShop.domain.response.ResCreateUserDTO;
import ChillGuy.WatchShop.domain.response.ResLoginDTO;
import ChillGuy.WatchShop.service.UserService;
import ChillGuy.WatchShop.service.RedisService;
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
    private final RedisService redisService;

    @Value("${watchshop.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenExpiration;

    @Value("${watchshop.jwt.access-token-validity-in-seconds}")
    private long accessTokenExpiration;

    public AuthController(
            UserService userService,
            PasswordEncoder passwordEncoder,
            AuthenticationManagerBuilder authenticationManagerBuilder,
            SecurityUtil securityUtil,
            RedisService redisService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityUtil = securityUtil;
        this.redisService = redisService;
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

    @PostMapping("/login")
    @ApiMessage("Đăng nhập")
    public ResponseEntity<ResLoginDTO> login(@Valid @RequestBody ReqLoginDTO loginDto) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResLoginDTO res = new ResLoginDTO();
        User currentUserDB = this.userService.getUserByEmail(loginDto.getEmail());
        res.setUser(userService.convertToResLoginUserDTO(currentUserDB));

        String access_token = this.securityUtil.createAccessToken(authentication.getName(), res);
        res.setAccessToken(access_token);
        String refresh_token = this.securityUtil.createRefreshToken(authentication.getName(), res);

        // Lưu refresh token vào Redis
        redisService.saveRefreshToken(loginDto.getEmail(), refresh_token, refreshTokenExpiration);

        // set cookies cho cả access_token và refresh_token
        ResponseCookie accessTokenCookie = ResponseCookie
                .from("access_token", access_token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(accessTokenExpiration) // 1 giờ
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie
                .from("refresh_token", refresh_token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body(res);
    }

    @GetMapping("/refresh")
    @ApiMessage("Refresh token")
    public ResponseEntity<ResLoginDTO> refreshToken(
            @CookieValue(name = "refresh_token", defaultValue = "abc") String refresh_token)
            throws ThrowBadReqException {
        if (refresh_token.equals("abc")) {
            throw new ThrowBadReqException("Bạn không có refresh token ở cookie");
        }

        // Kiểm tra tính hợp lệ của refresh token
        Jwt decodedToken = this.securityUtil.checkValidRefreshToken(refresh_token);
        String email = decodedToken.getSubject();

        // Kiểm tra refresh token trong Redis
        String storedToken = redisService.getRefreshToken(email);
        if (storedToken == null || !storedToken.equals(refresh_token)) {
            throw new ThrowBadReqException("Refresh Token không hợp lệ hoặc đã hết hạn");
        }

        // Tạo response mới
        ResLoginDTO res = new ResLoginDTO();
        User currentUserDB = this.userService.getUserByEmail(email);
        res.setUser(userService.convertToResLoginUserDTO(currentUserDB));

        // Tạo access token mới
        String access_token = this.securityUtil.createAccessToken(email, res);
        res.setAccessToken(access_token);

        // Tạo refresh token mới
        String new_refresh_token = this.securityUtil.createRefreshToken(email, res);

        // Lưu refresh token mới vào Redis
        redisService.saveRefreshToken(email, new_refresh_token, refreshTokenExpiration);

        // Set cookies mới cho cả access_token và refresh_token
        ResponseCookie accessTokenCookie = ResponseCookie
                .from("access_token", access_token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(accessTokenExpiration)
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie
                .from("refresh_token", new_refresh_token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(refreshTokenExpiration)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body(res);
    }

    @PostMapping("/logout")
    @ApiMessage("Logout User")
    public ResponseEntity<Void> logout() throws ThrowBadReqException {
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";

        if (email.equals("")) {
            throw new ThrowBadReqException("Access Token không hợp lệ");
        }

        // Xóa refresh token từ Redis
        redisService.deleteRefreshToken(email);

        // remove cả access_token và refresh_token cookies
        ResponseCookie deleteAccessTokenCookie = ResponseCookie
                .from("access_token", null)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();

        ResponseCookie deleteRefreshTokenCookie = ResponseCookie
                .from("refresh_token", null)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, deleteAccessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, deleteRefreshTokenCookie.toString())
                .body(null);
    }

    @GetMapping("/role")
    @ApiMessage("Lấy role từ access token")
    public ResponseEntity<String> getRoleFromToken(
            @CookieValue(name = "access_token", defaultValue = "") String accessToken) throws ThrowBadReqException {

        if (accessToken.isEmpty()) {
            throw new ThrowBadReqException("Không tìm thấy access token");
        }

        try {
            Jwt decodedToken = this.securityUtil.checkValidRefreshToken(accessToken);
            return ResponseEntity.ok(decodedToken.getClaimAsString("role"));
        } catch (Exception e) {
            throw new ThrowBadReqException("Access token không hợp lệ");
        }
    }
}
