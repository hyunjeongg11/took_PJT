package com.housing.back.repository.custom;

import java.util.List;
import com.housing.back.entity.MemberEntity;

public interface MemberRepositoryCustom {
    
    void changeStatus(Long userSeq,Boolean status);
    boolean isLeader(Long userSeq);
    MemberEntity findMemberByUserSeq(Long userSeq);
    List<MemberEntity> findAllMemberByPartySeq(Long partySeq);
    List<MemberEntity> partyDetail(Long userSeq, Long partySeq);
}
