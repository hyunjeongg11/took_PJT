package com.took.taxi_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaxiGuest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long guestSeq;  // 게스트 번호

    @ManyToOne
    @JoinColumn(name = "taxi_seq", nullable = false)
    private Taxi taxi;  // 택시 참조

    @Column(nullable = false)
    private Long userSeq;  // 사용자 번호

    @Column(nullable = false)
    private int cost;  // 비용

    @Column(nullable = false)
    private String destiName;  // 목적지 이름

    @Column(nullable = false)
    private double destiLat;  // 목적지 위도

    @Column(nullable = false)
    private double destiLon;  // 목적지 경도

    @Column(nullable = false)
    private int routeRank;  // 경로 순위
}
