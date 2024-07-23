package org.example.delivery_api.service;

import lombok.RequiredArgsConstructor;
import org.example.delivery_api.dto.DeliveryGuestCreateRequest;
import org.example.delivery_api.dto.DeliveryGuestDeleteRequest;
import org.example.delivery_api.dto.DeliveryGuestIsJoinRequest;
import org.example.delivery_api.dto.DeliveryGuestSelectResponse;
import org.example.delivery_api.entity.Delivery;
import org.example.delivery_api.entity.DeliveryGuest;
import org.example.delivery_api.repository.DeliveryGuestRepository;
import org.example.delivery_api.repository.DeliveryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class DeliveryGuestService {

    private final DeliveryRepository deliveryRepository;
    private final DeliveryGuestRepository deliveryGuestRepository;

    
    // 파티 참가
    @Transactional
    public void joinParty(DeliveryGuestCreateRequest request) {
        Delivery delivery = deliveryRepository.findByDeliverySeq(request.getDeliverySeq());
        deliveryGuestRepository.save(DeliveryGuest.builder()
                .delivery(delivery)
                .userSeq(request.getUserSeq())
                .pickUp(false)
                .build());

        delivery.setCount(delivery.getCount() + 1);
        deliveryRepository.save(delivery);
    }

    // 파티 퇴장
    @Transactional
    public void leaveParty(DeliveryGuestDeleteRequest request) {
        deliveryGuestRepository.deleteById(request.getDeliveryGuestSeq());
        Delivery delivery = deliveryRepository.findByDeliverySeq(request.getDeliverySeq());
        delivery.setCount(delivery.getCount() - 1);
        deliveryRepository.save(delivery);
    }

    // 파티 참가자 리스트
    @Transactional
    public List<DeliveryGuestSelectResponse> getGuestList(Long deliverySeq) {
        Delivery delivery = deliveryRepository.findByDeliverySeq(deliverySeq);
        List<DeliveryGuest> deliveryGuests = deliveryGuestRepository.findAllByDelivery(delivery);
        return deliveryGuests.stream()
                .map(DeliveryGuestSelectResponse::new)
                .toList();
    }

    // 파티 참가자 조회
    @Transactional
    public DeliveryGuestSelectResponse getGuest(Long deliveryGuestSeq) {
        DeliveryGuest deliveryGuest = deliveryGuestRepository.findByDeliveryGuestSeq(deliveryGuestSeq);
        return new DeliveryGuestSelectResponse(deliveryGuest);
    }
    
    // 배달 픽업 여부 변경
    @Transactional
    public void setPickUp(Long deliveryGuestSeq) {
        DeliveryGuest deliveryGuest = deliveryGuestRepository.findByDeliveryGuestSeq(deliveryGuestSeq);
        deliveryGuest.setPickUp(true);
        deliveryGuestRepository.save(deliveryGuest);
    }

    // 해당 방 참가 여부
    @Transactional
    public boolean isJoin(DeliveryGuestIsJoinRequest request) {
        Delivery delivery = deliveryRepository.findByDeliverySeq(request.getDeliverySeq());
        DeliveryGuest deliveryGuest = deliveryGuestRepository.findByDeliveryAndUserSeq(delivery, request.getUserSeq());
        return deliveryGuest != null;
    }
}
