package org.example.taxi_api.repository;

import org.example.taxi_api.entity.Taxi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaxiRepository extends JpaRepository<Taxi, Long>, TaxiRepositoryCustom {

    Taxi findByTaxiSeq(Long taxiSeq);
}
