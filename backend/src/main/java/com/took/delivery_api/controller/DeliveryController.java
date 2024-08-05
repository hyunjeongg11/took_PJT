package com.took.delivery_api.controller;

import com.took.delivery_api.dto.*;
import com.took.delivery_api.service.DeliveryGuestService;
import com.took.delivery_api.service.DeliveryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// REST 컨트롤러 정의
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/delivery")
@Tag(name = "DeliveryController", description = "배달 관련 API")
public class DeliveryController {

    // 서비스 클래스 주입
    private final DeliveryService deliveryService;
    private final DeliveryGuestService deliveryGuestService;

    @Operation(summary = "배달 생성 요청", description = "새로운 배달을 생성합니다.")
    @PostMapping("/create")
    ResponseEntity<DeliveryCreateResponse> createDelivery(
            @RequestBody @Parameter(description = "배달 생성 요청 정보", required = true) DeliveryCreateRequest request) {
        DeliveryCreateResponse response = deliveryService.createDelivery(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "정산 연결", description = "배달과 파티를 연결합니다.")
    @PutMapping("/setParty")
    ResponseEntity<?> setParty(
            @RequestBody @Parameter(description = "정산 연결 요청 정보", required = true) DeliverySerPartyRequest request) {
        deliveryService.setParty(request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "배달 글 수정", description = "배달 글을 수정합니다.")
    @PutMapping("/modify")
    ResponseEntity<?> modifyDelivery(
            @RequestBody @Parameter(description = "배달 글 수정 요청 정보", required = true) DeliveryModifyRequest request) {
        deliveryService.modifyDelivery(request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "배달 글 삭제", description = "배달 글을 삭제합니다.")
    @DeleteMapping("/delete/{deliverySeq}")
    ResponseEntity<?> deleteDelivery(
            @PathVariable @Parameter(description = "삭제할 배달 글의 고유 번호", required = true) Long deliverySeq) {
        deliveryService.deleteDelivery(deliverySeq);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "공지사항 등록", description = "공지사항을 등록합니다.")
    @PutMapping("/notice/create")
    ResponseEntity<?> createNotice(
            @RequestBody @Parameter(description = "공지사항 등록 요청 정보", required = true) DeliveryNoticeCreateRequest request) {
        deliveryService.createNotice(request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "공지사항 수정", description = "공지사항을 수정합니다.")
    @PutMapping("/notice/modify")
    ResponseEntity<?> modifyNotice(
            @RequestBody @Parameter(description = "공지사항 수정 요청 정보", required = true) DeliveryNoticeCreateRequest request) {
        deliveryService.modifyNotice(request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "공지사항 삭제", description = "공지사항을 삭제합니다.")
    @DeleteMapping("/notice/delete/{deliverySeq}")
    ResponseEntity<?> deleteNotice(
            @PathVariable @Parameter(description = "삭제할 공지사항의 고유 번호", required = true) Long deliverySeq) {
        deliveryService.deleteNotice(deliverySeq);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "배달 글 목록 조회", description = "배달 글 목록을 조회합니다.")
    @PostMapping("/list")
    ResponseEntity<List<DeliverySelectResponse>> getList(
            @RequestBody @Parameter(description = "배달 글 목록 조회 요청 정보", required = true) DeliveryListSelectRequest request) {
        List<DeliverySelectResponse> response = deliveryService.getList(request);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "배달 글 상세 조회", description = "배달 글의 상세 정보를 조회합니다.")
    @GetMapping("/{deliverySeq}")
    ResponseEntity<DeliverySelectResponse> getDetail(
            @PathVariable @Parameter(description = "조회할 배달 글의 고유 번호", required = true) Long deliverySeq) {
        DeliverySelectResponse response = deliveryService.getDetail(deliverySeq);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "배달 상태 변경", description = "배달 상태를 변경합니다.")
    @PutMapping("/setStatus")
    ResponseEntity<?> setStatus(
            @RequestBody @Parameter(description = "배달 상태 변경 요청 정보", required = true) DeliverySetStatusRequest request) {
        deliveryService.setStatus(request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "배달 파티 참가", description = "배달 파티에 참가합니다.")
    @PostMapping("/join")
    ResponseEntity<?> joinParty(
            @RequestBody @Parameter(description = "배달 파티 참가 요청 정보", required = true) DeliveryGuestCreateRequest request) {
        deliveryGuestService.joinParty(request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "배달 파티 퇴장", description = "배달 파티에서 퇴장합니다.")
    @PostMapping("/leave")
    ResponseEntity<?> leaveParty(
            @RequestBody @Parameter(description = "배달 파티 퇴장 요청 정보", required = true) DeliveryGuestDeleteRequest request) {
        deliveryGuestService.leaveParty(request);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "배달 파티 참가자 리스트 조회", description = "배달 파티 참가자 리스트를 조회합니다.")
    @GetMapping("/guest/list/{deliverySeq}")
    ResponseEntity<List<DeliveryGuestSelectResponse>> getGuestList(
            @PathVariable @Parameter(description = "조회할 배달 글의 고유 번호", required = true) Long deliverySeq) {
        List<DeliveryGuestSelectResponse> response = deliveryGuestService.getGuestList(deliverySeq);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "배달 파티 참가자 조회", description = "배달 파티 참가자를 조회합니다.")
    @GetMapping("/guest/{deliveryGuestSeq}")
    ResponseEntity<DeliveryGuestSelectResponse> getGuest(
            @PathVariable @Parameter(description = "조회할 배달 파티 참가자의 고유 번호", required = true) Long deliveryGuestSeq) {
        DeliveryGuestSelectResponse response = deliveryGuestService.getGuest(deliveryGuestSeq);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "배달 픽업 여부 변경", description = "배달 파티 참가자의 픽업 여부를 변경합니다.")
    @GetMapping("/guest/setPickUp/{deliveryGuestSeq}")
    ResponseEntity<?> setPickUp(
            @PathVariable @Parameter(description = "픽업 여부를 변경할 배달 파티 참가자의 고유 번호", required = true) Long deliveryGuestSeq) {
        deliveryGuestService.setPickUp(deliveryGuestSeq);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "참가 중인 방 리스트 조회", description = "사용자가 참가 중인 배달 방 리스트를 조회합니다.")
    @GetMapping("list/{userSeq}")
    ResponseEntity<List<DeliverySelectResponse>> getJoinList(
            @PathVariable @Parameter(description = "조회할 사용자의 고유 번호", required = true) Long userSeq) {
        List<DeliverySelectResponse> response = deliveryGuestService.getJoinList(userSeq);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "해당 방의 참가 여부 조회", description = "사용자가 특정 배달 방에 참가 중인지 여부를 조회합니다.")
    @PostMapping("/guest/isJoin")
    ResponseEntity<Boolean> isJoin(
            @RequestBody @Parameter(description = "참가 여부 조회 요청 정보", required = true) DeliveryGuestIsJoinRequest request) {
        boolean response = deliveryGuestService.isJoin(request);
        return ResponseEntity.ok(response);
    }
}
