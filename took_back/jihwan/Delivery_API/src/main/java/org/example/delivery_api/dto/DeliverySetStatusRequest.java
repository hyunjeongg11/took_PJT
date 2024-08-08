package org.example.delivery_api.dto;

import lombok.Data;

@Data
public class DeliverySetStatusRequest {
    private Long deliverySeq;
    private String status;
}
