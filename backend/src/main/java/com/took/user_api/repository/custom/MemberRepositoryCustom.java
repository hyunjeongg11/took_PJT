package com.took.user_api.repository.custom;


import com.took.user_api.entity.MemberEntity;

public interface MemberRepositoryCustom {

    void deleteMemberByPartySeq(Long partySeq, Long userSeq);

    Long findLeaderByPartySeq(Long partySeq);
    MemberEntity findMemberByPartySeqAndUserSeq(Long partySeq, Long userSeq);
}
