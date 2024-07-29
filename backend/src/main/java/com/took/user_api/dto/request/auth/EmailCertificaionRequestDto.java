package com.took.user_api.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EmailCertificaionRequestDto {
    
    @NotBlank
    private String userId;

    @Email
    @NotBlank
    private String email;
}
