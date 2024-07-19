package com.ssafy.shop_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productSeq;

    @Column(nullable = false)
    private Long productlistSeq;

    @Column(nullable = false)
    private String productName;

    @Column
    private String optionDetails;

    @Column
    private String etc;

    @Builder
    public Product(Long ProductSeq, String productName, String optionDetails, String etc) {
        this.productSeq = ProductSeq;
        this.productName = productName;
        this.optionDetails = optionDetails;
        this.etc = etc;
    }
}
