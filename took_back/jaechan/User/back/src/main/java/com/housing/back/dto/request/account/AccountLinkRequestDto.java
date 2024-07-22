package com.housing.back.dto.request.account;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AccountLinkRequestDto {

    private Long userSeq;

    @NotBlank
    private String bankName;
    
    @NotBlank
    private String accountNum;

    @NotBlank
    private String accountPwd;

    private String accountName;
    
}
