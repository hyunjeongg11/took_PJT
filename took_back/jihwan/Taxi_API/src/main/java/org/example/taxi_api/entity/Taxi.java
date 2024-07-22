package org.example.taxi_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Taxi {

    // 택시 상태를 나타내는 열거형 타입
    public enum Status {
        OPEN, FILLED, BOARD, DONE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long taxiSeq;  // 택시 번호

    @Column(nullable = false)
    private Long roomSeq;  // 채팅방 참조 번호

    @Column(nullable = false)
    private Long userSeq;  // 사용자 번호

    @Column
    private double startLat;  // 출발지 위도

    @Column
    private double startLon;  // 출발지 경도

    @Column(nullable = false)
    private boolean gender;  // 성별 여부

    @Column(nullable = false)
    private int count;  // 현재 인원 수

    @Column(nullable = false)
    private int max;  // 최대 인원 수

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;  // 택시 상태

    @Column(nullable = false)
    private LocalDateTime createdAt;  // 생성 일시

    @Column(nullable = false)
    private LocalDateTime finishTime;  // 종료 일시

    @Column
    private int cost;  // 비용

    @Column(nullable = false)
    private Long master;  // 결제자 번호

    @OneToMany(mappedBy = "taxi", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaxiGuest> taxiGuests;  // 택시 게스트 목록
}
