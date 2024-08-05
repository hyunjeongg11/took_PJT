package com.took.taxi_api.dto;

import lombok.Data;

@Data
public class TaxiSetCostRequest {

    private Long taxiSeq;  // 택시 식별 번호

    private int cost;  // 비용
}
