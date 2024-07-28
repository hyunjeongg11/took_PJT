package com.housing.back.dto.response.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponseDto extends ResponseDto{
    
    private String userName;
    private String phoneNumber;
    private String userId;
    private String email;

    public static ResponseEntity<UserInfoResponseDto> success(String userName,String phoneNumber,String userId,String email){
        UserInfoResponseDto responseBody = new UserInfoResponseDto(userName,phoneNumber,userId,email);
    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }
}
