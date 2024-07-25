package com.took.taxi_api.dto;

import lombok.Data;

@Data
public class ExpectCostRequest {

    private double startLat;

    private double startLon;

    private double endLat;

    private double endLon;

}
