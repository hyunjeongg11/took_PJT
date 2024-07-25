package com.took.delivery_api.dto;

import lombok.Data;

@Data
public class DeliveryModifyRequest {
    private Long deliverySeq;
    private String storeName;
    private String pickupPlace;
    private double pickupLat;
    private double pickupLon;
    private String deliveryTip;
    private String content;
    private String deliveryTime;
}
