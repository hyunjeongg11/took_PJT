package com.took.user_api.dto.response.user;


import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponseDto extends ResponseDto {
    
    private UserEntity user;

    public static ResponseEntity<UserInfoResponseDto> success(UserEntity user){
        UserInfoResponseDto responseBody = new UserInfoResponseDto(user);
    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }
}
