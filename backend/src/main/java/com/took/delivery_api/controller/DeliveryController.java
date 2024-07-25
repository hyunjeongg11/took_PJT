package com.took.delivery_api.controller;

import com.took.delivery_api.dto.*;
import com.took.delivery_api.service.DeliveryGuestService;
import com.took.delivery_api.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    
    // 정산 연결
    @PutMapping("/setParty")
    ResponseEntity<?> setParty(@RequestBody DeliverySerPartyRequest request) {
        deliveryService.setParty(request);
        return ResponseEntity.noContent().build();
    }

    // 글 수정
    @PutMapping("/modify")
    ResponseEntity<?> modifyDelivery(@RequestBody DeliveryModifyRequest request) {
        deliveryService.modifyDelivery(request);
        return ResponseEntity.noContent().build();
    }

    // 글 삭제
    @DeleteMapping("/delete/{deliverySeq}")
    ResponseEntity<?> deleteDelivery(@PathVariable Long deliverySeq) {
        deliveryService.deleteDelivery(deliverySeq);
        return ResponseEntity.noContent().build();
    }

    // 공지사항 등록
    @PutMapping("/notice/create")
    ResponseEntity<?> createNotice(@RequestBody DeliveryNoticeCreateRequest request) {
        deliveryService.createNotice(request);
        return ResponseEntity.noContent().build();
    }

    // 공지사항 수정
    @PutMapping("/notice/modify")
    ResponseEntity<?> modifyNotice(@RequestBody DeliveryNoticeCreateRequest request) {
        deliveryService.modifyNotice(request);
        return ResponseEntity.noContent().build();
    }

    // 공지사항 삭제
    @DeleteMapping("/notice/delete/{deliverySeq}")
    ResponseEntity<?> deleteNotice(@PathVariable Long deliverySeq) {
        deliveryService.deleteNotice(deliverySeq);
        return ResponseEntity.noContent().build();
    }

    // 배달 글 목록 조회
    @PostMapping("/list")
    ResponseEntity<List<DeliverySelectResponse>> getList(@RequestBody DeliveryListSelectRequest request) {
        List<DeliverySelectResponse> response = deliveryService.getList(request);
        return ResponseEntity.ok(response);
    }

    // 배달 글 상세 조회
    @GetMapping("/{deliverySeq}")
    ResponseEntity<DeliverySelectResponse> getDetail(@PathVariable Long deliverySeq) {
        DeliverySelectResponse response = deliveryService.getDetail(deliverySeq);
        return ResponseEntity.ok(response);
    }

    // 배달 상태 변경
    @PutMapping("/setStatus")
    ResponseEntity<?> setStatus(@RequestBody DeliverySetStatusRequest request) {
        deliveryService.setStatus(request);
        return ResponseEntity.noContent().build();
    }

    // 배달 파티 참가
    @PostMapping("/join")
    ResponseEntity<?> joinParty(@RequestBody DeliveryGuestCreateRequest request) {
        deliveryGuestService.joinParty(request);
        return ResponseEntity.noContent().build();
    }
    
    // 배달 파티 퇴장
    @PostMapping("/leave")
    ResponseEntity<?> leaveParty(@RequestBody DeliveryGuestDeleteRequest request) {
        deliveryGuestService.leaveParty(request);
        return ResponseEntity.noContent().build();
    }

    // 배달 파티 참가자 리스트 조회
    @GetMapping("/guest/list/{deliverySeq}")
    ResponseEntity<List<DeliveryGuestSelectResponse>> getGuestList(@PathVariable Long deliverySeq) {
        List<DeliveryGuestSelectResponse> response = deliveryGuestService.getGuestList(deliverySeq);
        return ResponseEntity.ok(response);
    }

    // 배달 파티 참가자 조회
    @GetMapping("/guest/{deliveryGuestSeq}")
    ResponseEntity<DeliveryGuestSelectResponse> getGuest(@PathVariable Long deliveryGuestSeq) {
        DeliveryGuestSelectResponse response = deliveryGuestService.getGuest(deliveryGuestSeq);
        return ResponseEntity.ok(response);
    }

    // 배달 픽업 여부 변경
    @GetMapping("/guest/setPick Up/{deliveryGuestSeq}")
    ResponseEntity<?> setPickUp(@PathVariable Long deliveryGuestSeq) {
        deliveryGuestService.setPickUp(deliveryGuestSeq);
        return ResponseEntity.noContent().build();
    }

    // 참가중인 방 리스트 조회
    @GetMapping("list/{userSeq}")
    ResponseEntity<List<DeliverySelectResponse>> getJoinList(@PathVariable Long userSeq) {
        List<DeliverySelectResponse> response = deliveryGuestService.getJoinList(userSeq);
        return ResponseEntity.ok(response);
    }

    // 해당 방의 참가 여부
    @PostMapping("/guest/isJoin")
    ResponseEntity<Boolean> isJoin(@RequestBody DeliveryGuestIsJoinRequest request) {
        boolean response = deliveryGuestService.isJoin(request);
        return ResponseEntity.ok(response);
    }
}
