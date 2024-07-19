package org.example.taxi_api.dto;

import lombok.Data;
import org.example.taxi_api.entity.TaxiGuest;

@Data
public class GuestListSelectResponse {

    private Long guestSeq;

    private Long taxiSeq;

    private Long userSeq;

    private int cost;

    private String destiName;

    private int routeRank;

    public GuestListSelectResponse(TaxiGuest taxiGuest) {
        this.guestSeq = taxiGuest.getGuestSeq();
        this.taxiSeq = taxiGuest.getTaxi().getTaxiSeq();
        this.userSeq = taxiGuest.getUserSeq();
        this.cost = taxiGuest.getCost();
        this.destiName = taxiGuest.getDestiName();
        this.routeRank = taxiGuest.getRouteRank();
    }
}
