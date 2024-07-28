package com.took.shop_api.repository;

import com.took.shop_api.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
      List<Product> findByPurchaseSeq(Long purchaseSeq);
      void deleteByPurchaseSeq(Long purchaseSeq);
}
