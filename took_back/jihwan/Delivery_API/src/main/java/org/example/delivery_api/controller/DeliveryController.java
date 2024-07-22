package org.example.delivery_api.controller;

import lombok.RequiredArgsConstructor;
import org.example.delivery_api.dto.DeliveryCreateRequest;
import org.example.delivery_api.dto.DeliveryCreateResponse;
import org.example.delivery_api.service.DeliveryGuestService;
import org.example.delivery_api.service.DeliveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// REST 컨트롤러 정의
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/delivery")
public class DeliveryController {

    // 서비스 클래스 주입
    private final DeliveryService deliveryService;
    private final DeliveryGuestService deliveryGuestService;

    // 배달 생성 요청을 처리하는 메서드
    @PostMapping("/create")
    ResponseEntity<DeliveryCreateResponse> createDelivery(@RequestBody DeliveryCreateRequest request) {
        // 요청을 처리하고 응답 생성
        DeliveryCreateResponse response = deliveryService.createDelivery(request);
        // 응답을 클라이언트에 반환
        return ResponseEntity.ok(response);
    }

}
