package com.took.taxi_api.repository;



import com.took.taxi_api.entity.TaxiGuest;
import com.took.user_api.entity.UserEntity;

import java.util.List;

public interface TaxiGuestRepositoryCustom {
    int findNextRankByTaxiSeq(Long taxiSeq);
    List<TaxiGuest> findDestinationsByTaxiSeqOrderedByRouteRank(Long taxiSeq);
    boolean existsByUser(UserEntity user);
}
