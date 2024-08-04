//package com.took.user_api.handler;
//
//import com.took.provider.JwtProvider;
//import com.took.user_api.entity.CustomOAuth2User;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//
//@Component
//@RequiredArgsConstructor
//public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//
//    private final JwtProvider jwtProvider;
//
//    @Override
//    public void onAuthenticationSuccess(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            Authentication authentication
//    ) throws IOException, ServletException {
//
//        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
//
//        String userId = oAuth2User.getName();
//
//        String accessToken = jwtProvider.createAccessToken(userId);
//        String refreshToken = jwtProvider.createRefreshToken(userId);
//
//
//        System.out.println("oauth에 성공했습니다!");
//        // HTML과 JavaScript를 통해 로컬 스토리지와 쿠키에 토큰 저장
//        String redirectUrl = "https://i11e205.p.ssafy.io/";
//        String script = "<script>" +
//                "localStorage.setItem('accessToken', '" + accessToken + "');" +
//                "document.cookie = 'refreshToken=" + refreshToken + "; path=/;';" +
//                "window.location.href = '" + redirectUrl + "';" +
//                "</script>";
//
//        response.setContentType("text/html");
//        response.getWriter().write(script);
//    }
//}
