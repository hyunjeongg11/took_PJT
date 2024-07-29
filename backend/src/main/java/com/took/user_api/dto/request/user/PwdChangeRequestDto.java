package com.took.user_api.dto.request.user;

import lombok.Getter;

@Getter
public class PwdChangeRequestDto {

    private Long userSeq;
    private String nowPwd;
    private String newPwd;
}
