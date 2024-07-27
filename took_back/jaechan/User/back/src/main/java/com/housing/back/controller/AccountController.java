package com.housing.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.housing.back.dto.response.account.ChangeMainResponseDto;
import com.housing.back.dto.response.account.AccountLinkResponseDto;
import com.housing.back.dto.response.account.AccountListResponsetDto;
import com.housing.back.dto.response.account.AccountBalanceResponseDto;
import com.housing.back.dto.request.account.AccountBalanceRequestDto;
import com.housing.back.dto.request.account.AccountLinkRequestDto;
import com.housing.back.dto.request.account.AccountListRequestDto;
import com.housing.back.dto.request.account.ChangeMainRequestDto;
import com.housing.back.service.AccountService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
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
        ResponseEntity<? super AccountLinkResponseDto> response = accountService.saveAccount(requestBody);
        return response;
    }

    @PostMapping("/account-list")
    public ResponseEntity<? super AccountListResponsetDto> accountList
    (
    @RequestBody @Valid AccountListRequestDto requestBody
    )
    {
        ResponseEntity<? super AccountListResponsetDto> response = accountService.accountList(requestBody);
        return response;
    }

    @PostMapping("/change-main-account")
    public ResponseEntity<? super ChangeMainResponseDto> ChangeMainAccount
    (
    @RequestBody @Valid ChangeMainRequestDto requestBody
    ){
        ResponseEntity<? super ChangeMainResponseDto> response = accountService.changeMain(requestBody);
        return response;
    }

    @PostMapping("/account-balance")
    public ResponseEntity<? super AccountBalanceResponseDto> postMethodName
    (
        @RequestBody @Valid AccountBalanceRequestDto requestBody
    ) {
        ResponseEntity<? super AccountBalanceResponseDto> response = accountService.balance(requestBody);
        
        return response;
    }
    
    
}
