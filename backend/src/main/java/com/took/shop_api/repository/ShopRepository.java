package com.took.shop_api.repository;

import com.took.shop_api.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {
    List<Shop> findByUserSeqInAndStatus(List<Long> userSeqs, Shop.statusType status);
}
