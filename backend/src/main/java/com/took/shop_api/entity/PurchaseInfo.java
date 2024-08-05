package com.took.shop_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.took.user_api.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


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


    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "shop_seq", nullable = false)
    private Shop shop;

    @Column(nullable = false)
    private int price;

    @Column
    private int shipCost;

    @JsonManagedReference
    @OneToMany(mappedBy = "purchaseInfo",cascade = CascadeType.REMOVE,orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Product> products;

    public void update(int price, int shipCost) {
        this.price = price;
        this.shipCost = shipCost;
    }
}