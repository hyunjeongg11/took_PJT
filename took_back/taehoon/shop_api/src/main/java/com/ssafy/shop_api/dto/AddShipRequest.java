package com.ssafy.shop_api.dto;

import com.ssafy.shop_api.entity.Product;
import com.ssafy.shop_api.entity.ShipInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddShipRequest {
    private Long shopSeq;
    private String courier;
    private String invoiceNum;

    public ShipInfo toEntity() {
        return ShipInfo.builder()
                .shopSeq(shopSeq)
                .courier(courier)
                .invoiceNum(invoiceNum)
                .build();
    }
}
