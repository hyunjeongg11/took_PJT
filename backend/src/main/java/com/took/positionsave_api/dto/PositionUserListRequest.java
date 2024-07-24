package com.took.positionsave_api.dto;

import lombok.Data;

@Data
public class PositionUserListRequest {

    private Long userSeq;

    private double lat;

    private double lon;
}
