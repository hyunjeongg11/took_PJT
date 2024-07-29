package com.took.user_api.repository.custom;



import com.took.user_api.entity.MemberEntity;

import java.util.List;

public interface MemberRepositoryCustom {
    
    void changeStatus(Long userSeq,Boolean status);
    boolean isLeader(Long userSeq);
    MemberEntity findMemberByUserSeq(Long userSeq);
    List<MemberEntity> findAllMemberByPartySeq(Long partySeq);
    List<MemberEntity> partyDetail(Long userSeq, Long partySeq);
}
