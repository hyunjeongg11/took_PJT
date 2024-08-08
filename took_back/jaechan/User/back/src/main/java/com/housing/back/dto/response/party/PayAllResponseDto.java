package com.housing.back.dto.response.party;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;

public class PayAllResponseDto extends ResponseDto {

    private PayAllResponseDto() {
        super();
    }

    public static ResponseEntity<PayAllResponseDto> success() {
        PayAllResponseDto responseBody = new PayAllResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
