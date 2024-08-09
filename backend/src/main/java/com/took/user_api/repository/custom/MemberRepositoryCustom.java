package com.took.user_api.repository.custom;


public interface MemberRepositoryCustom {

    void deleteMemberByPartySeq(Long partySeq, Long userSeq);

    Long findLeaderByPartySeq(Long partySeq);
}
