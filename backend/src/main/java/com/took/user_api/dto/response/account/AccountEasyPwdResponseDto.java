package com.took.user_api.dto.response.account;


import com.took.user_api.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class AccountEasyPwdResponseDto extends ResponseDto {

    public static ResponseEntity<AccountEasyPwdResponseDto> success() {
            AccountEasyPwdResponseDto responseBody = new AccountEasyPwdResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
}
