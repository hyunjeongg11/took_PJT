package org.example.taxi_api.dto;

import lombok.Data;
import org.example.taxi_api.entity.TaxiGuest;

@Data
public class DestinationListResponse {

    private int cost;

    private double destiLat;

    private double destiLon;

    private int routeRank;

    public DestinationListResponse(TaxiGuest taxiGuest) {
        this.cost = taxiGuest.getCost();
        this.destiLat = taxiGuest.getDestiLat();
        this.destiLon = taxiGuest.getDestiLon();
        this.routeRank = taxiGuest.getRouteRank();
    }
}
