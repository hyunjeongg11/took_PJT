package com.took.taxi_api.dto;

import lombok.Data;

@Data
public class TaxiSetCostRequest {

    private Long taxiSeq;

    private int cost;
}
