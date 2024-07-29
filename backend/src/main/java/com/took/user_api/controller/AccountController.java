package com.took.user_api.controller;


import com.took.user_api.dto.request.account.*;
import com.took.user_api.dto.response.account.*;
import com.took.user_api.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/account")
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

    @PostMapping("/make-easypwd")
    public ResponseEntity<? super AccountEasyPwdResponseDto> postMethodName(@RequestBody AccountEasyPwdRequestDto requestBody) {
        return accountService.updateEasyPwd(requestBody);
    }

    @PostMapping("/check-easypwd")
    public ResponseEntity<? super CheckEasyPwdResponseDto> checkEasyPwd(@RequestBody AccountEasyPwdRequestDto requestBody){
        return accountService.checkEasyPwd(requestBody);
    }
    
    
    @DeleteMapping("/account-delete/{accountSeq}")
    public ResponseEntity<String> deleteAccount(@PathVariable("accountSeq") Long accountSeq){
        return accountService.deleteAccount(accountSeq);
    }
    
}
