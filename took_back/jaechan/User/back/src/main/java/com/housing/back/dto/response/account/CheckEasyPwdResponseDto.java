package com.housing.back.dto.response.account;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class CheckEasyPwdResponseDto extends ResponseDto{

    private boolean checked;

    private CheckEasyPwdResponseDto(boolean checked){
        this.checked=checked;
    }

    public static ResponseEntity<CheckEasyPwdResponseDto> success(boolean checked) {
        CheckEasyPwdResponseDto responseBody = new CheckEasyPwdResponseDto(checked);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
