package com.took.user_api.repository.repositoryImpl;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.took.user_api.entity.MemberEntity;
import com.took.user_api.entity.QMemberEntity;
import com.took.user_api.repository.custom.MemberRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryCustomImpl implements MemberRepositoryCustom {
    
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

    @Override
    public List<MemberEntity> partyDetail(Long userSeq, Long partySeq) {
        
        QMemberEntity member = QMemberEntity.memberEntity;

        List<MemberEntity> result = null;

//userSeq가 null이면 안된다1
        result = jpaQueryFactory.selectFrom(member)
                                .where(member.party.partySeq.eq(partySeq).and(member.user.userSeq.ne(userSeq)))
                                .fetch();

        return result;
    }


}
