package com.took.user_api.dto.request.party;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MakePartyRequestDto {

    private Long userSeq;
    private String title;
    private int category;
    private int cost;
    private int totalMember;
    
}
