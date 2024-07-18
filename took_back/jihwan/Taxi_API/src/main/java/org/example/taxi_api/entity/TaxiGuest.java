package org.example.taxi_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity  // 이 클래스가 JPA 엔티티임을 나타냅니다.
@Data  // Lombok을 사용하여 getter, setter, toString 등의 메서드를 자동으로 생성합니다.
@Builder  // Lombok을 사용하여 빌더 패턴을 제공합니다.
@NoArgsConstructor  // Lombok을 사용하여 매개변수가 없는 생성자를 자동으로 생성합니다.
@AllArgsConstructor  // Lombok을 사용하여 모든 필드를 매개변수로 가지는 생성자를 자동으로 생성합니다.
public class TaxiGuest {

    @Id  // 이 필드가 엔티티의 기본 키임을 나타냅니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 기본 키 생성을 데이터베이스에 위임합니다.
    private Long guestSeq;  // 게스트 시퀀스 번호

    @ManyToOne  // 다대일 관계 설정
    @JoinColumn(name = "taxi_seq", nullable = false)  // 외래 키 설정 및 null 허용 안함
    private Taxi taxi;  // 택시 엔티티와의 관계

    @Column(nullable = false)  // 이 필드는 null 값을 허용하지 않습니다.
    private String userId;  // 사용자 ID

    @Column
    private int cost;  // 예상 비용

    @Column
    private String destiName;  // 도착지 이름

    @Column
    private double destiLat;  // 도착지 위도

    @Column
    private double destiLon;  // 도착지 경도
}
