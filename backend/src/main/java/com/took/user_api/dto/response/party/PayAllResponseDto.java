package com.took.user_api.dto.response.party;


import com.took.user_api.dto.response.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class PayAllResponseDto extends ResponseDto {

    private PayAllResponseDto() {
        super();
    }

    public static ResponseEntity<PayAllResponseDto> success() {
        PayAllResponseDto responseBody = new PayAllResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
