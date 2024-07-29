package com.took.user_api.dto.request.account;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChangeMainRequestDto {

    private Long userSeq;
    private Long accountSeq;
}
