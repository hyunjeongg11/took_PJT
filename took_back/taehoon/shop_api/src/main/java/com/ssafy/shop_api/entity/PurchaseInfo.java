package com.ssafy.shop_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long purchaseSeq;

    @Column(nullable = false)
    private Long userSeq;

    @Column(nullable = false)
    private Long shopSeq;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private int shipCost = 0;

    @Builder
    public PurchaseInfo(Long userSeq, Long shopSeq, int price, int shipCost) {
        this.userSeq = userSeq;
        this.shopSeq = shopSeq;
        this.price = price;
        this.shipCost = shipCost;
    }
    public void update(int price, int shipCost) {
        this.price = price;
        this.shipCost = shipCost;
    }
}