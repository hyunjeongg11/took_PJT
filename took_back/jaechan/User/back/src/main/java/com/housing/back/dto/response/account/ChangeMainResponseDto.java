package com.housing.back.dto.response.account;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class ChangeMainResponseDto extends ResponseDto {

    private ChangeMainResponseDto() {
        super();
    }

    public static ResponseEntity<ChangeMainResponseDto> success() {
        ChangeMainResponseDto responseBody = new ChangeMainResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
