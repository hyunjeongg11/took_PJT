package com.took.shop_api.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productSeq;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private Long purchaseSeq;

    @Column
    private String optionDetails;

    @Column
    private String etc;

    @Builder
    public Product(Long ProductSeq,Long purchaseSeq, String productName, String optionDetails, String etc) {
        this.productSeq = ProductSeq;
        this.purchaseSeq = purchaseSeq;
        this.productName = productName;
        this.optionDetails = optionDetails;
        this.etc = etc;
    }
    public void update(String optionDetails, String etc) {
        this.optionDetails = optionDetails;
        this.etc = etc;
    }

    public void updatePurchaseSeq(long purchaseSeq) {
        this.purchaseSeq = purchaseSeq;
    }
}
