package com.took.taxi_api.dto;

import lombok.Data;

@Data
public class TaxiSetPartyRequest {

    private Long taxiSeq;
    private Long partySeq;
}
