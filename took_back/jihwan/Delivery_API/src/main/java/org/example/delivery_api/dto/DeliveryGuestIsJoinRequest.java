package org.example.delivery_api.dto;

import lombok.Data;

@Data
public class DeliveryGuestIsJoinRequest {
    private Long deliverySeq;
    private Long userSeq;
}
