package org.example.taxi_api.repository;

import org.example.taxi_api.entity.Taxi;
import java.util.List;

public interface TaxiRepositoryCustom {
    List<Taxi> findTaxisByUserSeqs(List<Long> userSeqs);
}
