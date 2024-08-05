package com.took.delivery_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.took.user_api.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

// 엔티티 클래스 정의
@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryGuest {

    // 기본 키(primary key)로 사용될 필드 정의 및 자동 생성 전략 설정
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryGuestSeq;

    // Delivery 엔티티와 다대일(Many-to-One) 관계 설정
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "delivery_seq", nullable = false)
    private Delivery delivery;

    // 사용자의 고유 식별자 필드
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_seq", nullable = false)
    private UserEntity user;

    // 픽업 여부를 나타내는 필드
    @Column(nullable = false)
    private boolean pickUp;


    public void updatePickUp(boolean pickUp) {
        this.pickUp = pickUp;
    }

    public void deleteParent() {
        this.delivery = null;
    }
}
