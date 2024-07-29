package com.took.user_api.dto.request.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class MemberSaveRequestDto {    

    private Long userSeq;
    private Long partySeq;
    private int cost;

    private boolean status;
    private boolean receive;
    private boolean isLeader;

    
}
