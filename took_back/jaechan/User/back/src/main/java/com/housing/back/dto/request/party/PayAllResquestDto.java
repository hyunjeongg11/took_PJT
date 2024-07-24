package com.housing.back.dto.request.party;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayAllResquestDto {

    private Boolean isLeader;
    private Long userSeq;
    private Long partySeq;

}
