package com.took.delivery_api.dto;

import com.took.delivery_api.entity.Delivery;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DeliverySelectResponse {
    private Long deliverySeq;
    private Long userSeq;
    private Long roomSeq;
    private Long partySeq;
    private String storeName;
    private String pickupPlace;
    private String deliveryTip;
    private String content;
    private String notice;
    private String deliveryTime;
    private String status;
    private int count;
    private LocalDateTime createdAt;
    private LocalDateTime finishTime;

    public DeliverySelectResponse(Delivery delivery) {
        this.deliverySeq = delivery.getDeliverySeq();
        this.userSeq = delivery.getUserSeq();
        this.roomSeq = delivery.getRoomSeq();
        this.partySeq = delivery.getPartySeq();
        this.storeName = delivery.getStoreName();
        this.pickupPlace = delivery.getPickupPlace();
        this.deliveryTip = delivery.getDeliveryTip();
        this.content = delivery.getContent();
        this.deliveryTime = delivery.getDeliveryTime().toString();
        this.status = delivery.getStatus().name();
        this.count = delivery.getCount();
        this.createdAt = delivery.getCreatedAt();
        this.finishTime = delivery.getFinishTime();
    }
}
