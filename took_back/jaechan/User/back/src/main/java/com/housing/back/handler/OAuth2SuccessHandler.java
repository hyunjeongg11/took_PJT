package com.housing.back.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.housing.back.entity.CustomOAuth2User;
import com.housing.back.provider.JwtProvider;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {


    private final JwtProvider jwtProvider;

    @Override
    public void onAuthenticationSuccess(

        HttpServletRequest request, 
        HttpServletResponse response,
        Authentication authentication
        
        ) throws IOException, ServletException {
            
            CustomOAuth2User oAuth2User =(CustomOAuth2User)authentication.getPrincipal();

            String userId = oAuth2User.getName();
            
            String accessToken = jwtProvider.createAccessToken(userId);
            String resfreshToken = jwtProvider.createRefreshToken(userId);

            response.sendRedirect("http://localhost:3000/auth/oauth-response/"+"token:"+accessToken+"/3600");
        }


}
