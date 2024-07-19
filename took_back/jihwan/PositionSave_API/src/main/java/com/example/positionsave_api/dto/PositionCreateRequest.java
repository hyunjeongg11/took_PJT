package com.example.positionsave_api.dto;

import lombok.Data;

@Data
public class PositionCreateRequest {

    private Long userSeq;  // 사용자 ID를 저장하는 필드

    private double lat;     // 위치의 위도 정보를 저장하는 필드

    private double lon;     // 위치의 경도 정보를 저장하는 필드

}