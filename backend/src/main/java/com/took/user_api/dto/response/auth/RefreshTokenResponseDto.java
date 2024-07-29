package com.took.user_api.dto.response.auth;



import com.took.common.ResponseCode;
import com.took.common.ResponseMessage;
import com.took.user_api.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
