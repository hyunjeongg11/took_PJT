package com.took.user_api.dto.request.user;



import com.took.user_api.entity.UserEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class KakaoChangeRequestDto {

  private Long userSeq;
    
  private String userId;

  private String userName;

  private UserEntity.Gender gender;

  @NotBlank
  private String phoneNumber;
}
