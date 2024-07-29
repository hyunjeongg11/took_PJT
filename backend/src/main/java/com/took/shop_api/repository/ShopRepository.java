package com.took.shop_api.repository;

import com.took.shop_api.entity.Shop;
import com.took.user_api.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {
    List<Shop> findByUserInAndStatus(List<UserEntity> users, Shop.statusType status);
}
