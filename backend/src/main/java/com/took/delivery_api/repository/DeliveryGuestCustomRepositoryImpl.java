package com.took.delivery_api.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.took.delivery_api.entity.Delivery;
import com.took.delivery_api.entity.QDeliveryGuest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DeliveryGuestCustomRepositoryImpl implements DeliveryGuestCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public boolean areAllGuestsPickedUp(Delivery delivery) {
        QDeliveryGuest deliveryGuest = QDeliveryGuest.deliveryGuest;

        long count = queryFactory
                .selectFrom(deliveryGuest)
                .where(deliveryGuest.delivery.eq(delivery)
                        .and(deliveryGuest.pickUp.eq(false)))
                .fetch().size();

        return count == 0;
    }
}
