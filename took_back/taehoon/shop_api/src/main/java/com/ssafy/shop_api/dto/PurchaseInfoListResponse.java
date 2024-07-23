package com.ssafy.shop_api.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class PurchaseInfoListResponse {
    private List<PurchaseInfoResponse> purchaseInfoResponseList;
    private int listTotal;

    public PurchaseInfoListResponse(List<PurchaseInfoResponse> purchaseInfoResponseList, int listTotal) {
        this.purchaseInfoResponseList = purchaseInfoResponseList;
        this.listTotal = listTotal;
    }
}
