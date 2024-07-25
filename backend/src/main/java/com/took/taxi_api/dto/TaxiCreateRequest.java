package com.took.taxi_api.dto;

import lombok.Data;

@Data
public class TaxiCreateRequest {
    private boolean gender;

    private int max;

    private Long roomSeq;

    private Long userSeq;
}
