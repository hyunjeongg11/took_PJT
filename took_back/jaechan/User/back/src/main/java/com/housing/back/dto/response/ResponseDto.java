package com.housing.back.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.common.ResponseCode;
import com.housing.back.common.ResponseMessage;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseDto {

    private String code;
    private String message;

    // 생성자를 통해 success 값으로 초기화
    public ResponseDto(){
        this.code = ResponseCode.SUCCESS;
        this.message=ResponseMessage.SUCCESS;
    }

//  모두 공통으로 잡히는 데이터 베이스 에러를 여기에서 다루겠다.
//  500 에러 Internal_sever_error
    public static ResponseEntity<ResponseDto> databaseError(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DATABASE_ERROR,ResponseMessage.DATABASE_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    // validation 검증?
    public static ResponseEntity<ResponseDto> validationFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.VALIDATION_FAIL,ResponseMessage.VALIDATION_FAIL);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

    public static ResponseEntity<ResponseDto> nomoney(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.NO_MONEY,ResponseMessage.NO_MONEY);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }

}
