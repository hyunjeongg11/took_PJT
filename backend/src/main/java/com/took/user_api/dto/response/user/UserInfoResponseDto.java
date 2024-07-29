package com.took.user_api.dto.response.user;


import com.took.user_api.dto.response.ResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponseDto extends ResponseDto {
    
    private String userName;
    private String phoneNumber;
    private String userId;
    private String email;

    public static ResponseEntity<UserInfoResponseDto> success(String userName,String phoneNumber,String userId,String email){
        UserInfoResponseDto responseBody = new UserInfoResponseDto(userName,phoneNumber,userId,email);
    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }
}
