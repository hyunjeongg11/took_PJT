package com.took.delivery_api.service;

import com.took.delivery_api.dto.*;
import com.took.delivery_api.entity.Delivery;
import com.took.delivery_api.entity.DeliveryGuest;
import com.took.delivery_api.repository.DeliveryGuestRepository;
import com.took.delivery_api.repository.DeliveryRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


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

        delivery.updateCount(1);
    }

    // 파티 퇴장
    @Transactional
    public void leaveParty(DeliveryGuestDeleteRequest request) {
        deliveryGuestRepository.deleteById(request.getDeliveryGuestSeq());
        Delivery delivery = deliveryRepository.findByDeliverySeq(request.getDeliverySeq());
        delivery.updateCount(-1);
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
        deliveryGuest.updatePickUp(true);
    }

    // 해당 방 참가 여부
    @Transactional
    public boolean isJoin(DeliveryGuestIsJoinRequest request) {
        Delivery delivery = deliveryRepository.findByDeliverySeq(request.getDeliverySeq());
        DeliveryGuest deliveryGuest = deliveryGuestRepository.findByDeliveryAndUserSeq(delivery, request.getUserSeq());
        return deliveryGuest != null;
    }
    
    // 참가중인 방 목록
    @Transactional
    public List<DeliverySelectResponse> getJoinList(Long userSeq) {
        List<DeliveryGuest> deliveryGuests = deliveryGuestRepository.findAllByUserSeq(userSeq);

        // deliveryGuests의 delivery에서 deliverySeq만 뽑아서 리스트로 만들기
        List<Long> deliverySeqs = deliveryGuests.stream()
                .map(deliveryGuest -> deliveryGuest.getDelivery().getDeliverySeq())
                .collect(Collectors.toList());

        List<Delivery> deliveries = deliveryRepository.findByDeliverySeqIn(deliverySeqs);

        return deliveries.stream()
                .map(DeliverySelectResponse::new)
                .toList();
    }
}
