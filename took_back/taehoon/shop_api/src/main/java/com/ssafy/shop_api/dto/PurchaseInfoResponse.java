package com.ssafy.shop_api.dto;

import com.ssafy.shop_api.entity.PurchaseInfo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PurchaseInfoResponse {

    private Long purchaseSeq;

    private Long userSeq;

    private Long shopSeq;

    private int price;

    private int shipCost;

    private List<ProductResponse> productList;
    private int total;

    public PurchaseInfoResponse(PurchaseInfo purchaseInfo) {
        this.purchaseSeq = purchaseInfo.getPurchaseSeq();
        this.userSeq = purchaseInfo.getUserSeq();
        this.shopSeq = purchaseInfo.getShopSeq();
        this.price = purchaseInfo.getPrice();
        this.shipCost = purchaseInfo.getShipCost();
        this.total = this.price +this.shipCost;
    }
}
