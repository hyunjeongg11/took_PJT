package com.housing.back.dto.response.account;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class AccountBalanceResponseDto extends ResponseDto{

    private Long balance;
    
    private AccountBalanceResponseDto(Long balance){
        this.balance=balance;
    }

    
    public static ResponseEntity<AccountBalanceResponseDto> success(Long balance) {
        AccountBalanceResponseDto responseBody = new AccountBalanceResponseDto(balance);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
