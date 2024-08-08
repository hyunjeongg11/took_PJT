package com.housing.back.dto.response.account;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.housing.back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class AccountLinkResponseDto extends ResponseDto {

    private AccountLinkResponseDto() {
        super();
    }

    public static ResponseEntity<AccountLinkResponseDto> success() {
        AccountLinkResponseDto responseBody = new AccountLinkResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> notFound() {
        ResponseDto responseBody = new ResponseDto();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
    }
}
