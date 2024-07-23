package com.ssafy.shop_api.dto;

import com.ssafy.shop_api.entity.ShipInfo;
import lombok.Getter;

@Getter
public class ShipResponse {
    private final long shipSeq;
    private final String courier;
    private final String invoiceNum;

    public ShipResponse(ShipInfo shipInfo) {
        this.shipSeq = shipInfo.getShipSeq();
        this.courier = shipInfo.getCourier();
        this.invoiceNum = shipInfo.getInvoiceNum();
    }
}
