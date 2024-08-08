package com.took.user_api.repository.custom;



import com.took.user_api.entity.MemberEntity;

import java.util.List;

public interface MemberRepositoryCustom {
    

    List<MemberEntity> partyDetail(Long userSeq, Long partySeq);
    void deleteMemberByPartySeq(Long partySeq, Long userSeq);

    Long findLeaderByPartySeq(Long partySeq);
    MemberEntity findMemberByPartySeqAndUserSeq(Long partySeq, Long userSeq);
}
