package com.took.user_api.repository.custom;



import com.took.user_api.entity.MemberEntity;

import java.util.List;

public interface MemberRepositoryCustom {
    

    List<MemberEntity> partyDetail(Long userSeq, Long partySeq);
    void deleteMemberByPartySeq(Long partySeq, Long userSeq);
    Long findCostByMemberSeq(Long memberSeq);
    Long findPartySeqByMemberSeq(Long memberSeq);
    void changeStatusBySeq(Long memberSeq);

    Long findLeaderByPartySeq(Long partySeq);
    MemberEntity findMemberByPartySeqAndUserSeq(Long partySeq, Long userSeq);
}
