package com.took.user_api.repository.repositoryImpl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.took.user_api.entity.QPartyEntity;
import com.took.user_api.repository.custom.PartyRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PartyRepositoryCustomImpl implements PartyRepositoryCustom {


    private final JPAQueryFactory jpaQueryFactory;



    @Override
    public void updateCostBypartyId(Long partySeq, Long newCost) {

        QPartyEntity party = QPartyEntity.partyEntity;

        jpaQueryFactory.update(party)
                .set(party.cost, newCost)
                .where(party.partySeq.eq(partySeq))
                .execute();
    }

}
