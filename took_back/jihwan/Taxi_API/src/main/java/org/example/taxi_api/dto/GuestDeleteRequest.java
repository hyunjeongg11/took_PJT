package org.example.taxi_api.dto;

import lombok.Data;

@Data
public class GuestDeleteRequest {

    private Long taxiSeq;

    private Long userSeq;
}
