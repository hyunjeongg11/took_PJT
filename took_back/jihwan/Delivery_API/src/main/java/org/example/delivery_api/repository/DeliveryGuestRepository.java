package org.example.delivery_api.repository;

import org.example.delivery_api.entity.Delivery;
import org.example.delivery_api.entity.DeliveryGuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryGuestRepository extends JpaRepository<DeliveryGuest, Long> {
    List<DeliveryGuest> findAllByDelivery(Delivery delivery);

    DeliveryGuest findByDeliveryGuestSeq(Long deliveryGuestSeq);

    DeliveryGuest findByDeliveryAndUserSeq(Delivery delivery, Long userSeq);

    List<DeliveryGuest> findAllByUserSeq(Long userSeq);
}
