package com.ssafy.shop_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @Column(nullable = false)
    private long productlistSeq;

    public void update(int price, int shipCost, List<Product> productList) {
        this.price = price;
        this.shipCost = shipCost;
    }
}