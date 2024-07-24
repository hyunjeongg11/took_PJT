package com.took.positionsave_api.dto;

import lombok.Data;

@Data
public class PositionUserListResponse {

    private Long userSeq;
    private int distance; // 사용자와의 거리차이 (단위: m)
}
