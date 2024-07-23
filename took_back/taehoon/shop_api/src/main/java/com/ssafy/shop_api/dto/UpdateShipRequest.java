package com.ssafy.shop_api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateShipRequest {
    private String courier;
    private String invoiceNum;
}
