package com.took.delivery_api.dto;

import lombok.Data;

import java.util.List;

@Data
public class DeliveryListSelectRequest {

    private List<Long> userSeqs;
}
