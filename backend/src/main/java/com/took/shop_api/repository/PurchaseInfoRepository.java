package com.took.shop_api.repository;

import com.took.shop_api.entity.PurchaseInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseInfoRepository extends JpaRepository<PurchaseInfo, Long> {
    List<PurchaseInfo> findByShopSeq(Long shopSeq);
    PurchaseInfo findByShopSeqAndUserSeq(Long shopSeq, Long userSeq);
}
