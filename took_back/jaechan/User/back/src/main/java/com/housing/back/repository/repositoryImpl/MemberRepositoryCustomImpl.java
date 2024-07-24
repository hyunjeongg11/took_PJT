package com.housing.back.repository.repositoryImpl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.housing.back.entity.MemberEntity;
import com.housing.back.entity.QMemberEntity;
import com.housing.back.repository.custom.MemberRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryCustomImpl implements MemberRepositoryCustom{
    
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public void changeStatus(Long userSeq, Boolean status) {
        
        QMemberEntity member = QMemberEntity.memberEntity;

        jpaQueryFactory.update(member)
                        .set(member.status, status)  // status 값을 파라미터로 사용
                        .set(member.createdAt,LocalDateTime.now())
                        .where(member.user.userSeq.eq(userSeq))  // userSeq와 일치하는지 확인
                        .execute();

    }

    @Override
    public boolean isLeader(Long userSeq) {
        QMemberEntity member = QMemberEntity.memberEntity;

        Boolean isLeader = jpaQueryFactory.select(member.isLeader)
                        .from(member)
                        .where(member.user.userSeq.eq(userSeq))
                        .fetchOne();

        return Boolean.TRUE.equals(isLeader);
    }

    @Override
    public MemberEntity findMemberByUserSeq(Long userSeq) {
        QMemberEntity member = QMemberEntity.memberEntity;

        MemberEntity result = jpaQueryFactory.selectFrom(member)
                                             .where(member.user.userSeq.eq(userSeq))
                                             .fetchOne();

        return result;
    }

    @Override
    public List<MemberEntity> findAllMemberByPartySeq(Long partySeq) {
        
        QMemberEntity member = QMemberEntity.memberEntity;

        List<MemberEntity> result = null;

        result = jpaQueryFactory
                        .selectFrom(member)
                        .where((member.party.partySeq.eq(partySeq)))
                        .fetch();
        return result;
    }


}
