package com.took.taxi_api.dto;

import lombok.Data;

@Data
public class TaxiStartRequest {

    private Long taxiSeq;

    private int cost;

    private double startLat;

    private double startLon;
}
