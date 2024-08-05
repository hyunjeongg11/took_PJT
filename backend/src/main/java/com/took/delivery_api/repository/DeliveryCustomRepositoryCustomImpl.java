package com.took.delivery_api.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPADeleteClause;
import com.took.delivery_api.entity.QDelivery;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;



@Repository
@RequiredArgsConstructor
public class DeliveryCustomRepositoryCustomImpl implements DeliveryRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public void deleteByDeliverySeq(Long deliverySeq) {
        QDelivery qDelivery = QDelivery.delivery;

        // QueryDSL을 사용하여 deliverySeq에 해당하는 Delivery 엔티티 삭제
        queryFactory
                .delete(qDelivery)
                .where(qDelivery.deliverySeq.eq(deliverySeq))
                .execute();
    }
}
