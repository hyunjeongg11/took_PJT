package org.example.delivery_api.service;

import lombok.RequiredArgsConstructor;
import org.example.delivery_api.dto.*;
import org.example.delivery_api.entity.Delivery;
import org.example.delivery_api.repository.DeliveryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

// 서비스 클래스 정의
@Service
@RequiredArgsConstructor
public class DeliveryService {

    // 리포지토리 주입
    private final DeliveryRepository deliveryRepository;

    // 배달 생성 메서드
    @Transactional
    public DeliveryCreateResponse createDelivery(DeliveryCreateRequest request) {
        // 요청 데이터를 기반으로 Delivery 객체 생성
        Delivery delivery = Delivery.builder()
                .userSeq(request.getUserSeq()) // 사용자 식별자 설정
                .roomSeq(request.getRoomSeq()) // 채팅방 연결
                .storeName(request.getStoreName()) // 가게 이름 설정
                .pickupPlace(request.getPickupPlace()) // 픽업 장소 설정
                .deliveryTip(request.getDeliveryTip()) // 배달 팁 설정
                .deliveryTime(request.getDeliveryTime()) // 배달 시간 설정
                .content(request.getContent()) // 배달 내용 설정
                .count(0) // 초기 카운트 설정
                .status(Delivery.Status.OPEN) // 초기 상태 설정
                .createdAt(LocalDateTime.now()) // 생성 시간 설정
                .finishTime(LocalDateTime.now().plusHours(1)) // 종료 시간 설정
                .build();
        // Delivery 객체를 저장하고 응답 객체 생성
        return new DeliveryCreateResponse(deliveryRepository.save(delivery));
    }
    
    // 정산 연결
    @Transactional
    public void setParty(DeliverySerPartyRequest request) {
        Delivery delivery = deliveryRepository.findByDeliverySeq(request.getDeliverySeq());
        delivery.setPartySeq(request.getPartySeq());
        deliveryRepository.save(delivery);
    }
    
    // 글 수정
    @Transactional
    public void modifyDelivery(DeliveryModifyRequest request) {
        Delivery delivery = deliveryRepository.findByDeliverySeq(request.getDeliverySeq());
        delivery.setStoreName(request.getStoreName());
        delivery.setPickupPlace(request.getPickupPlace());
        delivery.setDeliveryTip(request.getDeliveryTip());
        delivery.setContent(request.getContent());
        delivery.setDeliveryTime(LocalDateTime.parse(request.getDeliveryTime()));
        deliveryRepository.save(delivery);
    }

    // 글 삭제
    @Transactional
    public void deleteDelivery(Long deliverySeq) {
        deliveryRepository.deleteById(deliverySeq);
    }
    
    // 공지사항 등록
    @Transactional
    public void createNotice(DeliveryNoticeCreateRequest request) {
        Delivery delivery = deliveryRepository.findByDeliverySeq(request.getDeliverySeq());
        delivery.setNotice(request.getNotice());
        deliveryRepository.save(delivery);
    }
    
    // 공지사항 수정
    @Transactional
    public void modifyNotice(DeliveryNoticeCreateRequest request) {
        Delivery delivery = deliveryRepository.findByDeliverySeq(request.getDeliverySeq());
        delivery.setNotice(request.getNotice());
        deliveryRepository.save(delivery);
    }

    // 공지사항 삭제
    @Transactional
    public void deleteNotice(Long deliverySeq) {
        Delivery delivery = deliveryRepository.findByDeliverySeq(deliverySeq);
        delivery.setNotice(null);
        deliveryRepository.save(delivery);
    }

    // 배달 글 리스트 조회
    @Transactional
    public List<DeliverySelectResponse> getList(DeliveryListSelectRequest request) {
        List<Delivery> deliveryList = deliveryRepository.findByUserSeqIn(request.getUserSeqs());
        return deliveryList.stream()
                .map(DeliverySelectResponse::new)
                .collect(Collectors.toList());
    }

    // 배달 글 상세 조회
    @Transactional
    public DeliverySelectResponse getDetail(Long deliverySeq) {
        Delivery delivery = deliveryRepository.findByDeliverySeq(deliverySeq);
        return new DeliverySelectResponse(delivery);
    }

    // 배달 상태 변경
    @Transactional
    public void setStatus(DeliverySetStatusRequest request) {
        Delivery delivery = deliveryRepository.findByDeliverySeq(request.getDeliverySeq());
        delivery.setStatus(Delivery.Status.valueOf(request.getStatus()));
        deliveryRepository.save(delivery);
    }

    // 참가중인 방 리스트 조회
    @Transactional
    public List<DeliverySelectResponse> getJoinList(Long userSeq) {
        List<Delivery> deliveryList = deliveryRepository.findAllByUserSeq(userSeq);
        return deliveryList.stream()
                .map(DeliverySelectResponse::new)
                .collect(Collectors.toList());
    }
}
