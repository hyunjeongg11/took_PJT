package com.took.user_api.repository.repositoryImpl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.took.user_api.entity.PartyEntity;
import com.took.user_api.entity.QMemberEntity;
import com.took.user_api.entity.QPartyEntity;
import com.took.user_api.repository.custom.PartyRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.took.user_api.entity.QPartyEntity.partyEntity;

@Repository
@RequiredArgsConstructor
public class PartyRepositoryCustomImpl implements PartyRepositoryCustom {


    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<PartyEntity> findMyPartyList(Long userSeq) {
        QPartyEntity party = partyEntity;
        QMemberEntity member = QMemberEntity.memberEntity;

        List<Long> userSeqList = jpaQueryFactory.select(member.party.partySeq).where(member.user.userSeq.eq(userSeq)).fetch();

        List<PartyEntity> list = null;

        list = jpaQueryFactory
                .selectFrom(party)
                .where(party.partySeq.in(userSeqList))
                .fetch();

        return list;
    }


    @Override
    public void updateCostBypartyId(Long partySeq, Long newCost) {

        QPartyEntity party = partyEntity;

        jpaQueryFactory.update(party)
                .set(party.cost, newCost)
                .where(partyEntity.partySeq.eq(partySeq))
                .execute(); }

    @Override
    public void changeStatusBySeq(Long partySeq) {

        QPartyEntity party = partyEntity;

        jpaQueryFactory.update(party)
                .set(party.status,true)
                .where(partyEntity.partySeq.eq(partySeq))
                .execute();
    }

    @Override
    public Long findCostByPartySeq(Long partySeq) {

        QPartyEntity party = partyEntity;
        return jpaQueryFactory.select(party.cost).from(party).where(party.partySeq.eq(partySeq)).fetchOne();

    }
}
