package com.took.taxi_api.repository;


import com.took.taxi_api.entity.Taxi;
import com.took.taxi_api.entity.TaxiGuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaxiGuestRepository extends JpaRepository<TaxiGuest, Long>, TaxiGuestRepositoryCustom {
    TaxiGuest findByUserSeqAndTaxi(Long userSeq, Taxi taxi);
    TaxiGuest findByUserSeq(Long userSeq);
    List<TaxiGuest> findByTaxi(Taxi taxi);
    TaxiGuest findByGuestSeq(Long guestSeq);
    List<TaxiGuest> findByTaxiAndDestiName(Taxi taxi, String destiName);
}
