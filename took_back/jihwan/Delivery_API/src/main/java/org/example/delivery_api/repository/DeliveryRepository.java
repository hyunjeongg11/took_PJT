package org.example.delivery_api.repository;

import org.example.delivery_api.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    Delivery findByDeliverySeq(Long deliverySeq);

    List<Delivery> findByUserSeqIn(List<Long> userSeqs);

    List<Delivery> findAllByUserSeq(Long userSeq);
}
