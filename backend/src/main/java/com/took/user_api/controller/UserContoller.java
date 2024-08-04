package com.took.user_api.controller;


import com.took.user_api.dto.request.user.KakaoChangeRequestDto;
import com.took.user_api.dto.request.user.NearUserRequestDto;
import com.took.user_api.dto.request.user.PwdChangeRequestDto;
import com.took.user_api.dto.request.user.UserSeqRequestDto;
import com.took.user_api.dto.response.VoidResponseDto;
import com.took.user_api.dto.response.user.DeliNearUserResponseDto;
import com.took.user_api.dto.response.user.KakaoChangeResponseDto;
import com.took.user_api.dto.response.user.UserInfoResponseDto;
import com.took.user_api.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserContoller {

    private final UserService userService;

    @PostMapping("/kakao-change")
    public ResponseEntity<? super KakaoChangeResponseDto> kakaoChange(
        @RequestBody @Valid KakaoChangeRequestDto requestBody
    ){
        ResponseEntity<? super KakaoChangeResponseDto> response = userService.kakaoChange(requestBody);
        return response;
    }

    @PostMapping("/sign-out")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authorizationHeader, HttpServletRequest request, HttpServletResponse response) {
        
        String accessToken = authorizationHeader.split(" ")[1];
        String refreshToken = null;

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if (accessToken != null && refreshToken != null) {
            userService.logout(accessToken, refreshToken, response);
            return ResponseEntity.ok("Logged out successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
        }
    }


    @PostMapping("/info")
    public ResponseEntity<? super UserInfoResponseDto> UserInfo
    (@RequestBody UserSeqRequestDto requestBody) {

        ResponseEntity<? super UserInfoResponseDto> response = userService.userInfo(requestBody);
        return response;
    }

    @PostMapping("/chang-pwd")
    public ResponseEntity<? super VoidResponseDto> postMethodName(@RequestBody PwdChangeRequestDto requestBody) {
        return userService.changePwd(requestBody);
    }

    @PostMapping("/delivery-near-user")
    public ResponseEntity<? super DeliNearUserResponseDto> deliveryNearUser
            (@RequestBody NearUserRequestDto requestBody) {

        ResponseEntity<? super DeliNearUserResponseDto> nearList = userService.searchNearUser(requestBody);

        return nearList;

    }

    @GetMapping("/change-alram")
    public ResponseEntity<? super VoidResponseDto> changeAlram(
            @RequestBody UserSeqRequestDto requestBody
    ){
        return userService.changeAlram(requestBody);
    }

}

    
