package com.took.delivery_api.dto;

import com.took.delivery_api.entity.Delivery;
import lombok.Data;


import java.time.LocalDateTime;

@Data
public class DeliveryCreateResponse {

    private Long deliverySeq;

    private Long userSeq;

    private Long roomSeq;

    private String storeName;

    private String pickupPlace;

    private String deliveryTip;

    private LocalDateTime deliveryTime;

    private String content;

    private int count = 1;

    private Delivery.Status status;

    private LocalDateTime createdAt;

    private LocalDateTime finishTime;

    public DeliveryCreateResponse(Delivery delivery) {
        this.deliverySeq = delivery.getDeliverySeq();
        this.userSeq = delivery.getDeliverySeq();
        this.roomSeq = delivery.getRoomSeq();
        this.storeName = delivery.getStoreName();
        this.pickupPlace = delivery.getPickupPlace();
        this.deliveryTip = delivery.getDeliveryTip();
        this.deliveryTime = delivery.getDeliveryTime();
        this.content = delivery.getContent();
        this.status = delivery.getStatus();
        this.createdAt = delivery.getCreatedAt();
        this.finishTime = delivery.getFinishTime();
    }
}

