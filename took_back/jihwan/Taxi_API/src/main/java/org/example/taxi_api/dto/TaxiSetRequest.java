package org.example.taxi_api.dto;

import lombok.Data;

@Data
public class TaxiSetRequest {

    private Long taxiSeq;

    private Long master;

    private int max;

    private boolean gender;
}
