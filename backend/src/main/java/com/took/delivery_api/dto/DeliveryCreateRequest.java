package com.took.delivery_api.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DeliveryCreateRequest {

    private Long userSeq;

    private Long roomSeq;

    private String storeName;

    private String pickupPlace;

    private String deliveryTip;

    private LocalDateTime deliveryTime;

    private String content;
}
