package com.housing.back.dto.response.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.common.ResponseCode;
import com.housing.back.common.ResponseMessage;
import com.housing.back.dto.response.ResponseDto;

public class KakaoChangeResponseDto extends ResponseDto{

  private KakaoChangeResponseDto(){
    super();
  }

  public static ResponseEntity<KakaoChangeResponseDto> success(){
    KakaoChangeResponseDto responseBody = new KakaoChangeResponseDto();
    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }

  public static ResponseEntity<ResponseDto> duplicatedId(){
    ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATED_ID,ResponseMessage.DUPLICATED_ID);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
  }

  public static ResponseEntity<ResponseDto> certificationFail(){
    ResponseDto responseBody = new ResponseDto(ResponseCode.CERTIFICATION_FAIL,ResponseMessage.CERTIFICATION_FAIL);
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
  }
  
}
