package com.took.user_api.dto.request.party;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PartyRequestDto {
    
    private String title;
    private String category;
    private int cost;
    private int totalMember;
    
}
