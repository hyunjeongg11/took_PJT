package com.took.taxi_api.dto;

import lombok.Data;

@Data
public class GuestSetDestinationAndCostRequest {

    private Long guestSeq;

    private String destiName;

    private double destiLat;

    private double destiLon;

    private int cost;

    private int routeRank;
}
