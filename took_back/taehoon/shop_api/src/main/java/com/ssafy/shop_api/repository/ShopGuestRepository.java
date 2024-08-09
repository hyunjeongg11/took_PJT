package com.ssafy.shop_api.repository;

import com.ssafy.shop_api.entity.ShopGuest;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopGuestRepository extends JpaRepository<ShopGuest, Long> {
    ShopGuest findByShopSeqAndUserSeq(long shopSeq, long userSeq);
    @Transactional
    void deleteByShopSeqAndUserSeq(long shopSeq, long userSeq);
    List<ShopGuest> findAllByShopSeq(long shopSeq);
}
