package org.example.delivery_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// 엔티티 클래스 정의
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryGuest {

    // 기본 키(primary key)로 사용될 필드 정의 및 자동 생성 전략 설정
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryGuestSeq;

    // Delivery 엔티티와 다대일(Many-to-One) 관계 설정
    @ManyToOne
    @JoinColumn(name = "delivery_seq", nullable = false)
    private Delivery delivery;

    // 사용자의 고유 식별자 필드
    @Column(nullable = false)
    private Long userSeq;

    // 픽업 여부를 나타내는 필드
    @Column(nullable = false)
    private boolean pickUp;


}
