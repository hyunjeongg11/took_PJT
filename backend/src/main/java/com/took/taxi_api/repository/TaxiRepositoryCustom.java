package com.took.taxi_api.repository;


import com.took.taxi_api.entity.Taxi;

import java.util.List;

public interface TaxiRepositoryCustom {
    List<Taxi> findTaxisByUserSeqs(List<Long> userSeqs);
}
