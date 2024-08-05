package com.took.delivery_api.repository;


import com.took.delivery_api.entity.Delivery;
import com.took.user_api.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    Delivery findByDeliverySeq(Long deliverySeq);

    List<Delivery> findByUserIn(List<UserEntity> users);

    List<Delivery> findByDeliverySeqIn(List<Long> deliverySeqs);

    void deleteByDeliverySeq(Long deliverySeq);
}
