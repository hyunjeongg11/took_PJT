package com.took.user_api.dto.request.party;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
public class InsertAllMemberRequestDto {

    private Long partySeq;
    private List<userCost> userCosts;

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class userCost{
        private Long userSeq;
        private Long cost;
    }


}
