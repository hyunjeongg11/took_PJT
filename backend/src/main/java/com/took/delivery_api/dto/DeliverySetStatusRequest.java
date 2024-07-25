package com.took.delivery_api.dto;

import lombok.Data;

@Data
public class DeliverySetStatusRequest {
    private Long deliverySeq;
    private String status;
}
