package com.housing.back.dto.response.account;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class AccountEasyPwdResponseDto extends ResponseDto{

    public static ResponseEntity<AccountEasyPwdResponseDto> success() {
            AccountEasyPwdResponseDto responseBody = new AccountEasyPwdResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
}
