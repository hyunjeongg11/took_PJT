package com.took.user_api.service.implement;


import com.took.user_api.dto.request.user.KakaoChangeRequestDto;
import com.took.user_api.dto.request.user.UserInfoRequestDto;
import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.dto.response.user.KakaoChangeResponseDto;
import com.took.user_api.dto.response.user.UserInfoResponseDto;
import com.took.user_api.entity.UserEntity;
import com.took.user_api.repository.UserRepository;
import com.took.user_api.repository.custom.UserCustomRepository;
import com.took.user_api.service.TokenBlacklistService;
import com.took.user_api.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserCustomRepository userCustomRepository;
    private final TokenBlacklistService tokenBlacklistService;

    @Override
    @Transactional
    public ResponseEntity<? super KakaoChangeResponseDto> kakaoChange(KakaoChangeRequestDto dto) {
        
        try{

            userCustomRepository.kakaoChange(dto);


        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return KakaoChangeResponseDto.success();
    }


    @Override
    public void logout(String accessToken, String refreshToken, HttpServletResponse response) {
       
        long accessTokenExpriy = tokenBlacklistService.getExpiryFromToken(accessToken);
        long refreshTokenExpriy = tokenBlacklistService.getExpiryFromToken(refreshToken);

        tokenBlacklistService.addToken(accessToken, accessTokenExpriy, TimeUnit.MILLISECONDS);
        tokenBlacklistService.addToken(refreshToken, refreshTokenExpriy, TimeUnit.MILLISECONDS);
    
        Cookie cookie = new Cookie("refreshToken",null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }


    @Override
    public ResponseEntity<? super UserInfoResponseDto> userInfo(UserInfoRequestDto requestBody) {
        
        UserEntity user = null;
        try{

            user = userRepository.getReferenceById(requestBody.getUserSeq());

        }catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }

        return UserInfoResponseDto.success(user.getUserName(), user.getPhoneNumber(), user.getUserId(), user.getEmail());
    }
    

}
