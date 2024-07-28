package com.took.shop_api.dto;

import com.took.shop_api.entity.PurchaseInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddPurchaseInfo {
    private Long userSeq;

    private Long shopSeq;

    private int price;

    private int shipCost;

    private List<AddProduct> productList;

    public PurchaseInfo toEntity() {
        return PurchaseInfo.builder()
                .userSeq(userSeq)
                .shopSeq(shopSeq)
                .price(price)
                .shipCost(shipCost)
                .build();
    }
}
