package com.took.user_api.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2FailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException exception
    ) throws IOException, ServletException {
        // 로그인 실패 시 예외 정보를 콘솔에 출력
//        System.out.println("OAuth2 로그인 실패:");
//        System.out.println("예외 메시지: " + exception.getMessage());

        // 실패 후 리다이렉트할 URL 설정 (예: 로그인 페이지로 리다이렉트)
        String redirectUrl = "https://i11e205.p.ssafy.io/";
        String script = "<script>" +
                "alert('로그인에 실패했습니다.');" +
                "window.location.href = '" + redirectUrl + "';" +
                "</script>";

        response.setContentType("text/html");
        response.getWriter().write(script);
    }
}
