package com.took.user_api.dto.response.auth;


import com.took.common.ResponseCode;
import com.took.common.ResponseMessage;
import com.took.user_api.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SignUpResponseDto extends ResponseDto {
  
  private SignUpResponseDto(){
    super();
  }

  public static ResponseEntity<SignUpResponseDto> success(){
    SignUpResponseDto responseBody = new SignUpResponseDto();

    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }

  public static ResponseEntity<ResponseDto> duplicatedId(){
    ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_ID, ResponseMessage.DUPLICATED_ID);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
  }

  public static ResponseEntity<ResponseDto> certificationFail(){
    ResponseDto responseBody = new ResponseDto(ResponseCode.CERTIFICATION_FAIL,ResponseMessage.CERTIFICATION_FAIL);
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
  }
}
