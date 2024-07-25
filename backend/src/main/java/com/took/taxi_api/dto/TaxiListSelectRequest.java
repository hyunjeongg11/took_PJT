package com.took.taxi_api.dto;


import lombok.Data;

import java.util.List;

@Data
public class TaxiListSelectRequest {

    private List<Long> userSeqs;

}
