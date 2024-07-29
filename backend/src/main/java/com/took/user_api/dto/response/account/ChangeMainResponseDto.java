package com.took.user_api.dto.response.account;


import com.took.user_api.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
