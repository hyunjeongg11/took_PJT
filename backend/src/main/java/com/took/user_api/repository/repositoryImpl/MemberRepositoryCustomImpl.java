package com.took.user_api.repository.repositoryImpl;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.took.user_api.entity.MemberEntity;
import com.took.user_api.entity.QMemberEntity;
import com.took.user_api.repository.custom.MemberRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryCustomImpl implements MemberRepositoryCustom {
    
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<MemberEntity> partyDetail(Long userSeq, Long partySeq) {
        
        QMemberEntity member = QMemberEntity.memberEntity;

        List<MemberEntity> result = null;

        result = jpaQueryFactory.selectFrom(member)
                                .where(member.party.partySeq.eq(partySeq).and(member.user.userSeq.ne(userSeq)))
                                .fetch();

        return result;
    }

    @Override
    public void deleteMemberByPartySeq(Long partySeq, Long userSeq) {

        QMemberEntity member = QMemberEntity.memberEntity;
        jpaQueryFactory.delete(member).where(member.party.partySeq.eq(partySeq).and(member.user.userSeq.eq(userSeq))).execute();
    }

    @Override
    public Long findCostByMemberSeq(Long memberSeq) {

        QMemberEntity member = QMemberEntity.memberEntity;
        Long result = null;

        result=jpaQueryFactory.select(member.cost).from(member).where(member.memberSeq.eq(memberSeq)).fetchOne();

        return result;
    }

    @Override
    public Long findPartySeqByMemberSeq(Long memberSeq) {

        QMemberEntity member = QMemberEntity.memberEntity;
        Long result = null;

        result = jpaQueryFactory.select(member.party.partySeq).from(member).where(member.memberSeq.eq(memberSeq)).fetchOne();

        return result;
    }


    public void changeStatusBySeq(Long memberSeq) {

        QMemberEntity member = QMemberEntity.memberEntity;

        jpaQueryFactory.update(member)
                .where(member.memberSeq.eq(memberSeq))
                .set(member.status,true)
                .execute();
    }

    @Override
    public Long findLeaderByPartySeq(Long partySeq) {

        QMemberEntity member = QMemberEntity.memberEntity;

        Long result = null;

        result = jpaQueryFactory.select(member.user.userSeq)
                                .from(member)
                                .where(member.party.partySeq.eq(partySeq).and(member.leader.isTrue()))
                                .fetchOne();

        return result;
    }

    @Override
    public MemberEntity findMemberByPartySeqAndUserSeq(Long partySeq, Long userSeq) {

        QMemberEntity member = QMemberEntity.memberEntity;

        MemberEntity result = null;

        result = jpaQueryFactory.selectFrom(member).where(member.party.partySeq.eq(partySeq).and(member.user.userSeq.eq(userSeq))).fetchOne();
        return result;
    }
}
