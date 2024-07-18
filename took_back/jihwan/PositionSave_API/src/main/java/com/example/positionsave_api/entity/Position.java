package com.example.positionsave_api.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@Builder
@RedisHash("Position")
public class Position {

    @Id
    private String userId;  // Redis에서 사용할 Primary Key로 지정된 필드

    private double lat;     // 위치의 위도 정보를 저장하는 필드
    private double lon;     // 위치의 경도 정보를 저장하는 필드
}