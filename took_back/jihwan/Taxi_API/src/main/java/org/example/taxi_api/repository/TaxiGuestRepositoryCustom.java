package org.example.taxi_api.repository;

import org.example.taxi_api.entity.TaxiGuest;

import java.util.List;

public interface TaxiGuestRepositoryCustom {
    int findNextRankByTaxiSeq(Long taxiSeq);
    List<TaxiGuest> findDestinationsByTaxiSeqOrderedByRouteRank(Long taxiSeq);
    boolean existsByUserSeq(Long userSeq);
}
