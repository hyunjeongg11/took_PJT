package com.took.user_api.dto.request.account;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AccountLinkRequestDto {

    private Long userSeq;

    private Boolean main;
    
    @NotBlank
    private String accountNum;

    @NotBlank
    private String accountPwd;

    private String accountName;
    
}
