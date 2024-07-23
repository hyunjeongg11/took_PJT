package com.housing.back.dto.request.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class MemberSaveRequestDto {    

    private Long user_seq;
    private Long party_seq;
    private int cost;

    private boolean status;
    private boolean receive;
    private boolean isLeader;

    
}
