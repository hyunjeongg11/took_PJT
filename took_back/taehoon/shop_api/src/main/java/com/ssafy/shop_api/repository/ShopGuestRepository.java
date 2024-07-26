package com.ssafy.shop_api.repository;

import com.ssafy.shop_api.entity.ShopGuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopGuestRepository extends JpaRepository<ShopGuest, Long> {
    ShopGuest findByShopSeqAndUserSeq(long shopSeq, long userSeq);
}
