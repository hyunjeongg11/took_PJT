package org.example.taxi_api.repository;

import org.example.taxi_api.entity.Taxi;
import org.example.taxi_api.entity.TaxiGuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaxiGuestRepository extends JpaRepository<TaxiGuest, Long>, TaxiGuestRepositoryCustom {
    TaxiGuest findByUserSeqAndTaxi(Long userSeq, Taxi taxi);
    TaxiGuest findByUserSeq(Long userSeq);
    List<TaxiGuest> findByTaxi(Taxi taxi);

}
