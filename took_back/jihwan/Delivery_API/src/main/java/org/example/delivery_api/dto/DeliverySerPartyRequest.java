package org.example.delivery_api.dto;

import lombok.Data;

@Data
public class DeliverySerPartyRequest {
    private Long deliverySeq;

    private Long partySeq;
}
