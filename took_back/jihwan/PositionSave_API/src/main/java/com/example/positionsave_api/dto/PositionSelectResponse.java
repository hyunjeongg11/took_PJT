package com.example.positionsave_api.dto;

import com.example.positionsave_api.entity.Position;
import lombok.Data;

@Data
public class PositionSelectResponse {

    private Long userSeq;  // 사용자 ID
    private double lat;     // 위치의 위도 정보
    private double lon;     // 위치의 경도 정보

    /**
     * Position 엔터티를 기반으로하는 생성자
     * @param position Position 엔터티 객체
     */
    public PositionSelectResponse(Position position) {
        this.userSeq = position.getUserSeq();  // Position 엔터티의 userId 값을 가져와 필드에 설정
        this.lat = position.getLat();        // Position 엔터티의 lat 값을 가져와 필드에 설정
        this.lon = position.getLon();        // Position 엔터티의 lon 값을 가져와 필드에 설정
    }
}