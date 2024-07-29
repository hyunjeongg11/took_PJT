package com.took.user_api.service;


import com.took.user_api.dto.LocationDto;
import com.took.user_api.dto.request.user.KakaoChangeRequestDto;
import com.took.user_api.dto.request.user.NearUserRequestDto;
import com.took.user_api.dto.request.user.UserInfoRequestDto;
import com.took.user_api.dto.response.user.DeliNearUserResponseDto;
import com.took.user_api.dto.response.user.KakaoChangeResponseDto;
import com.took.user_api.dto.response.user.UserInfoResponseDto;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<? super KakaoChangeResponseDto> kakaoChange(KakaoChangeRequestDto dto);
    void logout(String accessToken,String refreshToken,HttpServletResponse response);
    ResponseEntity<? super UserInfoResponseDto> userInfo(UserInfoRequestDto requestBody);
    ResponseEntity<? super DeliNearUserResponseDto> searchNearUser(NearUserRequestDto requestBody);
}
