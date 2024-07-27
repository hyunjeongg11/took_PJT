package com.took.sms_api.entity;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;


@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@RedisHash("Identity")
public class Identity {

    @Id
    private String phoneNumber;

    @Indexed
    private int code;

    @TimeToLive
    private Long expiration; // 유효 기간을 초 단위로 설정
}


