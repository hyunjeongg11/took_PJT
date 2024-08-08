package com.housing.back.service;

import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.user.KakaoChangeResponseDto;
import com.housing.back.dto.response.user.UserInfoResponseDto;

import jakarta.servlet.http.HttpServletResponse;

import com.housing.back.dto.request.user.KakaoChangeRequestDto;
import com.housing.back.dto.request.user.UserInfoRequestDto;

public interface UserService {
    ResponseEntity<? super KakaoChangeResponseDto> kakaoChange(KakaoChangeRequestDto dto);
    void logout(String accessToken,String refreshToken,HttpServletResponse response);
    ResponseEntity<? super UserInfoResponseDto> userInfo(UserInfoRequestDto requestBody);
}
