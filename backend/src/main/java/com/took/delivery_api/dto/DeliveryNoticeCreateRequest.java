package com.took.delivery_api.dto;

import lombok.Data;

@Data
public class DeliveryNoticeCreateRequest {
    private Long deliverySeq;

    private String notice;
}
