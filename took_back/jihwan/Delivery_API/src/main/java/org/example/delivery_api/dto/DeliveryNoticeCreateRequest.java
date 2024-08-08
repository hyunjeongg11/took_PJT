package org.example.delivery_api.dto;

import lombok.Data;

@Data
public class DeliveryNoticeCreateRequest {
    private Long deliverySeq;

    private String notice;
}
