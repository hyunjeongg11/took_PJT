package org.example.taxi_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity  // 이 클래스가 JPA 엔티티임을 나타냅니다.
@Data  // Lombok을 사용하여 getter, setter, toString 등의 메서드를 자동으로 생성합니다.
@Builder  // Lombok을 사용하여 빌더 패턴을 제공합니다.
@NoArgsConstructor  // Lombok을 사용하여 매개변수가 없는 생성자를 자동으로 생성합니다.
@AllArgsConstructor  // Lombok을 사용하여 모든 필드를 매개변수로 가지는 생성자를 자동으로 생성합니다.
public class Taxi {

    public enum Status {
        OPEN, FILLED, BOARD, DONE  // 상태를 나타내는 열거형 (모집중, 모집완료, 탑승중, 탑승완료)
    }

    @Id  // 이 필드가 엔티티의 기본 키임을 나타냅니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 기본 키 생성을 데이터베이스에 위임합니다.
    private long taxiSeq;  // 택시 시퀀스 번호

    @Column
    private String startName;  // 출발지 이름

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

    @Enumerated(EnumType.STRING)  // Enum 값을 문자열로 데이터베이스에 저장합니다.
    @Column(nullable = false)
    private Status status;  // 상태

    @Column(nullable = false)
    private LocalDateTime createdAt;  // 생성 일시

    @Column(nullable = false)
    private LocalDateTime finishTime;  // 종료 일시

    @Column
    private int cost;  // 단체 경로 예상 비용
    
    @Column(nullable = false)
    private String master; // 결제자

    @OneToMany(mappedBy = "taxi", cascade = CascadeType.ALL, orphanRemoval = true)  // 일대다 관계 설정
    private List<TaxiGuest> taxiGuests;  // 택시에 탑승한 게스트들
}
