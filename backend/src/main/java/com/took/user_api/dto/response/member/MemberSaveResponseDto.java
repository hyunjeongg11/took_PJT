package com.took.user_api.dto.response.member;


import com.took.user_api.dto.response.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class MemberSaveResponseDto extends ResponseDto {

    private MemberSaveResponseDto() {
        super();
    }

    public static ResponseEntity<MemberSaveResponseDto> success() {
        MemberSaveResponseDto responseBody = new MemberSaveResponseDto();

        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
