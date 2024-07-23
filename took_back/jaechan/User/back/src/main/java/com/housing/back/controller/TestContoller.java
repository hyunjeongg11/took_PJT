package com.housing.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.housing.back.dto.request.user.KakaoChangeRequestDto;
import com.housing.back.dto.response.user.KakaoChangeResponseDto;
import com.housing.back.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class TestContoller {

    private final UserService userService;

    @PostMapping("/kakao-change")
    public ResponseEntity<? super KakaoChangeResponseDto> kakaoChange(
        @RequestBody @Valid KakaoChangeRequestDto requestBody
    ){
        ResponseEntity<? super KakaoChangeResponseDto> response = userService.kakaoChange(requestBody);
        return response;
    }
}

    
