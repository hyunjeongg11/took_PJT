package org.example.delivery_api.repository;

import org.example.delivery_api.entity.DeliveryGuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryGuestRepository extends JpaRepository<DeliveryGuest, Long> {
}
