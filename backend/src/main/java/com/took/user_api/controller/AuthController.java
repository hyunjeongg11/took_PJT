package com.took.user_api.controller;


import com.took.user_api.dto.request.auth.*;
import com.took.user_api.dto.response.auth.*;
import com.took.user_api.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;

    @PostMapping("/id-check")
    public ResponseEntity<? super IdCheckResponseDto> idCheck(@RequestBody @Valid IdCheckRequestDto requestBody) {

        System.out.println("컨트롤러에서 진입합니다.");
        ResponseEntity<? super IdCheckResponseDto> response = authService.idCheck(requestBody);
        return response;
    }

    @PostMapping("/email-certification")
    public ResponseEntity<? super EmailCertificationResponseDto> emailCertification(@RequestBody @Valid EmailCertificaionRequestDto requestBody)
    {
        ResponseEntity<? super EmailCertificationResponseDto> response = authService.emailCertification(requestBody);
        return response;
    }

    @PostMapping("/check-certification")
    public ResponseEntity<? super CheckCertificationResponseDto>
    checkCertification(@RequestBody @Valid CheckCertificationRequestDto requestBody)
    {
        ResponseEntity<? super CheckCertificationResponseDto> response = authService.checkCertification(requestBody);
        return response;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto>signUp(
        @RequestBody @Valid SignUpRequestDto requestBody
    ){
        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn(
        @RequestBody @Valid SignInRequestDto requestBody
    ){
        ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
        return response;
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(
        @RequestBody @Valid RefreshTokenRequestDto requestBody
    ){
        ResponseEntity<? super RefreshTokenResponseDto> response = authService.refreshAccessToken(requestBody);
        return response;
    }   
    

    
    
    
}