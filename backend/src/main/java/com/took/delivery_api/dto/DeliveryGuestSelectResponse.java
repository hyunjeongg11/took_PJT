package com.took.delivery_api.dto;

import com.took.delivery_api.entity.DeliveryGuest;
import lombok.Data;


@Data
public class DeliveryGuestSelectResponse {
    private Long deliveryGuestSeq;
    private Long deliverySeq;
    private Long userSeq;
    private boolean pickUp;

    public DeliveryGuestSelectResponse(DeliveryGuest deliveryGuest) {
        this.deliveryGuestSeq = deliveryGuest.getDeliveryGuestSeq();
        this.deliverySeq = deliveryGuest.getDelivery().getDeliverySeq();
        this.userSeq = deliveryGuest.getUserSeq();
        this.pickUp = deliveryGuest.isPickUp();
    }
}
