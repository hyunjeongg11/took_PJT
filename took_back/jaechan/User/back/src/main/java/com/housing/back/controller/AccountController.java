package com.housing.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.housing.back.dto.response.account.AccountLinkResponseDto;
import com.housing.back.dto.request.account.AccountLinkRequestDto;
import com.housing.back.service.AccountService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/v1/account")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    // 사용자와 계좌를 연결하는 로직
    @PostMapping("/link-account")
    public ResponseEntity<? super AccountLinkResponseDto> postMethodName
    (
    @RequestBody @Valid AccountLinkRequestDto requestBody
    ) 
    {
        System.out.println("권한을 부여받고 컨트롤러에 진입하였습니다.");
        ResponseEntity<? super AccountLinkResponseDto> response = accountService.saveAccount(requestBody);
        return response;
    }
    
}
