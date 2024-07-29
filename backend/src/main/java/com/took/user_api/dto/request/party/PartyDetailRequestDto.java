package com.took.user_api.dto.request.party;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PartyDetailRequestDto {

    private Long partySeq;
    private Long userSeq;
    
}
