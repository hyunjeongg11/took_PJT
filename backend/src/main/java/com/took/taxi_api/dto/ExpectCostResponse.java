package com.took.taxi_api.dto;

import lombok.Data;

@Data
public class ExpectCostResponse {

    private int cost; // 택시 비용 + Toll 비용

    public ExpectCostResponse(int cost) {
        this.cost = cost;
    }
}
