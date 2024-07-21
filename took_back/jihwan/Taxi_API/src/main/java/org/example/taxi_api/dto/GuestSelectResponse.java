package org.example.taxi_api.dto;

import lombok.Data;
import org.example.taxi_api.entity.TaxiGuest;

@Data
public class GuestSelectResponse {

    private Long taxiSeq;

    private Long userSeq;

    private String destiName;

    private double destiLat;

    private double destiLon;

    private int cost;

    private int routeRank;

    public GuestSelectResponse(TaxiGuest taxiGuest) {
        this.taxiSeq = taxiGuest.getTaxi().getTaxiSeq();
        this.userSeq = taxiGuest.getUserSeq();
        this.destiName = taxiGuest.getDestiName();
        this.destiLat = taxiGuest.getDestiLat();
        this.destiLon = taxiGuest.getDestiLon();
        this.cost = taxiGuest.getCost();
        this.routeRank = taxiGuest.getRouteRank();
    }
}
