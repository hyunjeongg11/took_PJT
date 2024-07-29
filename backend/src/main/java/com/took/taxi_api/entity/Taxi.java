package com.took.taxi_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.took.chat_api.entity.ChatRoom;
import com.took.user_api.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@ToString
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

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "room_seq", nullable = false)
    private ChatRoom chatRoom;  // 채팅방 참조 번호

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_seq", nullable = false)
    private UserEntity user;  // 사용자 참조

    @Column
    private Long partySeq; // 정산 참조 번호

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


    @JsonManagedReference
    @OneToMany(mappedBy = "taxi", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<TaxiGuest> taxiGuests;  // 택시 게스트 목록

    public void updateTaxi(Long master, int max, boolean gender) {
        this.master = master;
        this.max = max;
        this.gender = gender;
    }

    public void updateStatus(Status status) {
        this.status = status;
    }

    public void updateStart(double startLat, double startLon, int cost) {
        this.startLat = startLat;
        this.startLon = startLon;
        this.cost = cost;
    }

    public void updateCost(int cost) {
        this.cost = cost;
    }

    public void updateParty(Long partySeq) {
        this.partySeq = partySeq;
    }

    public void updateCount(int i) {
        this.count += i;
    }
}
 