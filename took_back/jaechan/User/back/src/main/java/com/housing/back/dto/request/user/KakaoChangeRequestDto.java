package com.housing.back.dto.request.user;


import com.housing.back.entity.UserEntity.Gender;

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

  private Gender gender;

  @NotBlank
  private String phoneNumber;
}
