package com.took.user_api.dto.request.auth;



import com.took.user_api.entity.UserEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {


  @NotBlank
  private String userId;

  @NotBlank
  private String password;

  @NotBlank
  private String userName;

  private UserEntity.Gender gender;

  @NotBlank
  private String phoneNumber;

  @NotBlank
  private String birth;

  @Email
  @NotBlank
  private String email;

  @NotBlank
  private String certificationNumber;

  
}
