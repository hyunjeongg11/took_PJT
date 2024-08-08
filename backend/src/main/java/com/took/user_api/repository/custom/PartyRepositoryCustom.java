package com.took.user_api.repository.custom;

import com.took.user_api.entity.PartyEntity;

import java.util.List;

public interface PartyRepositoryCustom {

    List<PartyEntity> findMyPartyList(Long userSeq);
    void updateCostBypartyId(Long partySeq, Long newCost);
    void changeStatusBySeq(Long partySeq);
}
