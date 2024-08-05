package com.took.user_api.dto.response.user;


import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponseDto extends ResponseDto {

    private Long userSeq;
    private String userId;
    private String userName;
    private String email;
    private String phoneNumber;
    private String birth;
    private LocalDateTime createdAt;
    private String sido;
    private String gugun;
    private String addr;
    private Double lat;
    private Double lng;
    private Integer imageNo;
    private String role;
    private String nickname;

    // 정적 팩토리 메서드 추가
    public static UserInfoResponseDto fromEntity(UserEntity user) {
        return new UserInfoResponseDto(
                user.getUserSeq(),
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getBirth(),
                user.getCreatedAt(),
                user.getSido(),
                user.getGugun(),
                user.getAddr(),
                user.getLat(),
                user.getLng(),
                user.getImageNo(),
                user.getRole(),
                user.getNickname()
        );
    }

    public static ResponseEntity<UserInfoResponseDto> success(UserEntity user){
        UserInfoResponseDto responseBody = new UserInfoResponseDto().fromEntity(user);
    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }
}
