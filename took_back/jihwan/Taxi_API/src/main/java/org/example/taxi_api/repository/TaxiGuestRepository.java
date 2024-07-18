package org.example.taxi_api.repository;

import org.example.taxi_api.entity.TaxiGuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaxiGuestRepository extends JpaRepository<TaxiGuest, Long> {
}
