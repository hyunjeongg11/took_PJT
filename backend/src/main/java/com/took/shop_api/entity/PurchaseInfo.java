package com.took.shop_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.took.user_api.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long purchaseSeq;


    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_seq", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private Long shopSeq;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private int shipCost = 0;

//    @Builder
//    public PurchaseInfo(Long userSeq, Long shopSeq, int price, int shipCost) {
//        this.userSeq = userSeq;
//        this.shopSeq = shopSeq;
//        this.price = price;
//        this.shipCost = shipCost;
//    }

    public void update(int price, int shipCost) {
        this.price = price;
        this.shipCost = shipCost;
    }
}