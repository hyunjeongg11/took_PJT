package org.example.taxi_api.dto;

import lombok.Data;
import lombok.Setter;

@Data
public class ExpectCostResponse {

    private int cost; // 택시 비용 + Toll 비용

    public ExpectCostResponse(int cost) {
        this.cost = cost;
    }
}
