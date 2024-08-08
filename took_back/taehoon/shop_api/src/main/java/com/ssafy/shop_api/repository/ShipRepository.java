package com.ssafy.shop_api.repository;

import com.ssafy.shop_api.entity.PurchaseInfo;
import com.ssafy.shop_api.entity.ShipInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipRepository extends JpaRepository<ShipInfo, Long> {
    ShipInfo findByShopSeq(Long shopSeq);
}
