package com.took.user_api.dto.response.auth;


import com.took.common.ResponseCode;
import com.took.common.ResponseMessage;
import com.took.user_api.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;

import java.time.Duration;

@Getter
public class SignInResponseDto extends ResponseDto {

    private String accessToken;
    private String refreshToken;
    private Long userSeq;

    private SignInResponseDto(String accessToken,Long userSeq){
        this.accessToken = accessToken;
        this.userSeq = userSeq;
    }
    
    public static ResponseEntity<SignInResponseDto> success(String accessToekn,String refreshToken,Long userSeq){

        SignInResponseDto responseBody = new SignInResponseDto(accessToekn,userSeq);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                                            .httpOnly(true)
                                            .secure(true)
                                            .path("/")
                                            .maxAge(Duration.ofDays(30))
                                            .build();


        return ResponseEntity.status(HttpStatus.OK).header(HttpHeaders.SET_COOKIE,cookie.toString()).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> signInFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }

}
