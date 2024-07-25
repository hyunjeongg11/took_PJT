package com.took.delivery_api.dto;

import lombok.Data;

@Data
public class DeliveryModifyRequest {
    private Long deliverySeq;
    private String storeName;
    private String pickupPlace;
    private String deliveryTip;
    private String content;
    private String deliveryTime;
}
