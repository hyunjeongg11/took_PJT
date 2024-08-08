package com.took.user_api.handler;

import com.took.Gdomain.RefreshToken;
import com.took.Grepository.RefreshTokenRepository;
import com.took.config.oauth.GOAuth2AuthorizationRequestBasedOnCookieRepository;
import com.took.provider.JwtProvider;
import com.took.user_api.entity.UserEntity;
import com.took.user_api.service.UserService;
import com.took.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.time.Duration;

@RequiredArgsConstructor
@Component
public class GOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final Logger logger = LoggerFactory.getLogger(GOAuth2SuccessHandler.class);
    public static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
    public static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(14);
    public static final Duration ACCESS_TOKEN_DURATION = Duration.ofDays(1);
    public static final String REDIRECT_PATH = "https://i11e205.p.ssafy.io/";

    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final GOAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        logger.info("oauth 인증이 성공해 성공핸들러에 진입합니다.");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        logger.info("oauthrized OAuth2User attributes: {}", oAuth2User.getAttributes());

        UserEntity user = userService.findByEmail((String) oAuth2User.getAttributes().get("email"));
        logger.info("email founded User found: {}", user);

        String refreshToken = jwtProvider.createRefreshToken(user.getUserId());
        saveRefreshToken(user.getUserId(), refreshToken);
        addRefreshTokenToCookie(request, response, refreshToken);

        String accessToken = jwtProvider.createAccessToken(user.getUserId());
        String targetUrl = getTargetUrl(accessToken);

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private void saveRefreshToken(String userId, String newRefreshToken) {
        RefreshToken refreshToken = refreshTokenRepository.findByUserId(userId)
                .map(entity -> entity.update(newRefreshToken))
                .orElse(new RefreshToken(userId, newRefreshToken));

        refreshTokenRepository.save(refreshToken);
    }

    private void addRefreshTokenToCookie(HttpServletRequest request, HttpServletResponse response, String refreshToken) {
        int cookieMaxAge = (int) REFRESH_TOKEN_DURATION.toSeconds();

        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN_COOKIE_NAME);
        CookieUtil.addCookie(response, REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieMaxAge);
    }

    private void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

//  그리고서 token까지 같이 던져서 가져간다.
    private String getTargetUrl(String token) {
        return UriComponentsBuilder.fromUriString(REDIRECT_PATH)
                .queryParam("token", token)
                .build()
                .toUriString();
    }
}
