package com.ssafy.shop_api.dto;

import com.ssafy.shop_api.entity.Product;
import com.ssafy.shop_api.entity.PurchaseInfo;
import lombok.Getter;

import java.util.List;

@Getter
public class PurchaseInfoResponse {

    private final Long purchaseSeq;

    private final Long userSeq;

    private final Long shopSeq;

    private final int price;

    private final int shipCost;

    private final List<Product> productList;

    public PurchaseInfoResponse(PurchaseInfo purchaseInfo) {
        this.purchaseSeq = purchaseInfo.getPurchaseSeq();
        this.userSeq = purchaseInfo.getUserSeq();
        this.shopSeq = purchaseInfo.getShopSeq();
        this.price = purchaseInfo.getPrice();
        this.productList = purchaseInfo.getProductList();
        this.shipCost = purchaseInfo.getShipCost();
    }
}
