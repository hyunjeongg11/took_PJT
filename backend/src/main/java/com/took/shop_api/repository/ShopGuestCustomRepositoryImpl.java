package com.took.shop_api.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.took.shop_api.entity.QShopGuest;
import com.took.shop_api.entity.Shop;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ShopGuestCustomRepositoryImpl implements ShopGuestCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public boolean areAllGuestsPickedUp(Shop shop) {
        QShopGuest shopGuest = QShopGuest.shopGuest;

        long count = queryFactory
                .selectFrom(shopGuest)
                .where(shopGuest.shop.eq(shop)
                        .and(shopGuest.pickUp.eq(false)))
                .fetch().size();

        return count == 0;
    }
}
