package com.took.shop_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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


    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "purchase_seq", nullable = false)
    private PurchaseInfo purchaseInfo;

    @Column
    private String optionDetails;

    @Column
    private String etc;

}
