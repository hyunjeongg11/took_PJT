package com.took.user_api.dto.response.account;


import com.took.user_api.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class CheckEasyPwdResponseDto extends ResponseDto {

    private boolean checked;

    private CheckEasyPwdResponseDto(boolean checked){
        this.checked=checked;
    }

    public static ResponseEntity<CheckEasyPwdResponseDto> success(boolean checked) {
        CheckEasyPwdResponseDto responseBody = new CheckEasyPwdResponseDto(checked);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
