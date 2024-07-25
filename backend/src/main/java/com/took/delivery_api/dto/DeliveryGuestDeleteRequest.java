package com.took.delivery_api.dto;

import lombok.Data;

@Data
public class DeliveryGuestDeleteRequest {

    private Long deliverySeq;
    private Long deliveryGuestSeq;
}
