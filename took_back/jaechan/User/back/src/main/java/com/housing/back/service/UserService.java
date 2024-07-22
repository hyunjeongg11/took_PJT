package com.housing.back.service;

import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.user.KakaoChangeResponseDto;
import com.housing.back.dto.request.user.KakaoChangeRequestDto;

public interface UserService {
    ResponseEntity<? super KakaoChangeResponseDto> kakaoChange(KakaoChangeRequestDto dto);
}
