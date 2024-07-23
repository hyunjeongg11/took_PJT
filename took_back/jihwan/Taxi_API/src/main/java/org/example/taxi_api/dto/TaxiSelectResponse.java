package org.example.taxi_api.dto;

import lombok.Data;
import org.example.taxi_api.entity.Taxi;

import java.time.LocalDateTime;


@Data
public class TaxiSelectResponse {

    private Long taxiSeq;

    private Long roomSeq;

    private Long userSeq;

    private Long partySeq;

    private double startLat;

    private double startLon;

    private boolean gender;

    private int count;

    private int max;

    private Taxi.Status status;

    private LocalDateTime createdAt;

    private LocalDateTime finishTime;

    private int cost;

    private Long master;

    public TaxiSelectResponse(Taxi taxi) {
        this.taxiSeq = taxi.getTaxiSeq();
        this.roomSeq = taxi.getRoomSeq();
        this.userSeq = taxi.getUserSeq();
        this.partySeq = taxi.getPartySeq();
        this.startLat = taxi.getStartLat();
        this.startLon = taxi.getStartLon();
        this.gender = taxi.isGender();
        this.count = taxi.getCount();
        this.max = taxi.getMax();
        this.status = taxi.getStatus();
        this.createdAt = taxi.getCreatedAt();
        this.finishTime = taxi.getFinishTime();
        this.cost = taxi.getCost();
        this.master = taxi.getMaster();
    }
}
