package com.took.taxi_api.dto;

import com.took.taxi_api.entity.TaxiGuest;
import lombok.Data;


@Data
public class DestinationListResponse {

    private Long userSeq;

    private int cost;

    private String destiName;

    private double destiLat;

    private double destiLon;

    private int routeRank;

    public DestinationListResponse(TaxiGuest taxiGuest) {
        this.userSeq = taxiGuest.getUserSeq();
        this.cost = taxiGuest.getCost();
        this.destiName = taxiGuest.getDestiName();
        this.destiLat = taxiGuest.getDestiLat();
        this.destiLon = taxiGuest.getDestiLon();
        this.routeRank = taxiGuest.getRouteRank();
    }
}
