package com.housing.back.dto.response.member;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;

public class MemberSaveResponseDto extends ResponseDto {

    private MemberSaveResponseDto() {
        super();
    }

    public static ResponseEntity<MemberSaveResponseDto> success() {
        MemberSaveResponseDto responseBody = new MemberSaveResponseDto();

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
