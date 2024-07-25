package com.took.taxi_api.dto;

import lombok.Data;

@Data
public class GuestSetRankRequest {

    private Long taxiSeq;

    private String destiName;

    private int routeRank;
}
