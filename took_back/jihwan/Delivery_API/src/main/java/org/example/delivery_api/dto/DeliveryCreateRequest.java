package org.example.delivery_api.dto;

import lombok.Data;

@Data
public class DeliveryCreateRequest {

    private Long userSeq;

    private Long roomSeq;

    private String storeName;

    private String pickupPlace;

    private String deliveryTip;

    private String content;

}
