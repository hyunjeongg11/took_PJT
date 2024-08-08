package com.housing.back.dto.response.auth;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.common.ResponseCode;
import com.housing.back.common.ResponseMessage;
import com.housing.back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class RefreshTokenResponseDto extends ResponseDto {

    private String newAccessToken;

    private RefreshTokenResponseDto(String newAccessToken) {
        this.newAccessToken = newAccessToken;
    }

    public static ResponseEntity<RefreshTokenResponseDto> success(String newAccessToken) {

        RefreshTokenResponseDto responseBody = new RefreshTokenResponseDto(newAccessToken);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> refreshFail() {
        ResponseDto responseBody = new ResponseDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

}
