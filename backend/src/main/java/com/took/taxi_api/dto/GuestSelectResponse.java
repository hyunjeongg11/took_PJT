package com.took.taxi_api.dto;

import com.took.taxi_api.entity.TaxiGuest;
import lombok.Data;


@Data
public class GuestSelectResponse {

    private Long guestSeq;

    private Long taxiSeq;

    private Long userSeq;

    private String destiName;

    private double destiLat;

    private double destiLon;

    private int cost;

    private int routeRank;

    public GuestSelectResponse(TaxiGuest taxiGuest) {
        this.guestSeq = taxiGuest.getGuestSeq();
        this.taxiSeq = taxiGuest.getTaxi().getTaxiSeq();
        this.userSeq = taxiGuest.getUser().getUserSeq();
        this.destiName = taxiGuest.getDestiName();
        this.destiLat = taxiGuest.getDestiLat();
        this.destiLon = taxiGuest.getDestiLon();
        this.cost = taxiGuest.getCost();
        this.routeRank = taxiGuest.getRouteRank();
    }
}
