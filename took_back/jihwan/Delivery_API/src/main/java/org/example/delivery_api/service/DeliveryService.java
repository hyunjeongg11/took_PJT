package org.example.delivery_api.service;

import lombok.RequiredArgsConstructor;
import org.example.delivery_api.dto.DeliveryCreateRequest;
import org.example.delivery_api.dto.DeliveryCreateResponse;
import org.example.delivery_api.entity.Delivery;
import org.example.delivery_api.repository.DeliveryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

// 서비스 클래스 정의
@Service
@RequiredArgsConstructor
public class DeliveryService {

    // 리포지토리 주입
    private final DeliveryRepository deliveryRepository;

    // 배달 생성 메서드
    public DeliveryCreateResponse createDelivery(DeliveryCreateRequest request) {
        // 요청 데이터를 기반으로 Delivery 객체 생성
        Delivery delivery = Delivery.builder()
                .userSeq(request.getUserSeq()) // 사용자 식별자 설정
                .storeName(request.getStoreName()) // 가게 이름 설정
                .pickupPlace(request.getPickupPlace()) // 픽업 장소 설정
                .deliveryTip(request.getDeliveryTip()) // 배달 팁 설정
                .content(request.getContent()) // 배달 내용 설정
                .count(0) // 초기 카운트 설정
                .status(Delivery.Status.OPEN) // 초기 상태 설정
                .createdAt(LocalDateTime.now()) // 생성 시간 설정
                .finishTime(LocalDateTime.now().plusHours(1)) // 종료 시간 설정
                .build();
        // Delivery 객체를 저장하고 응답 객체 생성
        return new DeliveryCreateResponse(deliveryRepository.save(delivery));
    }


}
