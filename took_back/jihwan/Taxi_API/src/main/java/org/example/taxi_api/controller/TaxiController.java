package org.example.taxi_api.controller;

import lombok.RequiredArgsConstructor;
import org.example.taxi_api.dto.*;
import org.example.taxi_api.service.TaxiGuestService;
import org.example.taxi_api.service.TaxiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/taxi")
public class TaxiController {

    private final TaxiService taxiService;  // 택시 서비스
    private final TaxiGuestService taxiGuestService;  // 택시 게스트 서비스

    /**
     * 택시를 생성합니다.
     * @param request 택시 생성 요청 데이터
     * @return 응답 엔티티
     */
    @PostMapping("/create")
    ResponseEntity<TaxiSelectResponse> createTaxi(@RequestBody TaxiCreateRequest request) {
        TaxiSelectResponse response = taxiService.createTaxi(request);
        return ResponseEntity.ok(response);
    }

    /**
     * 택시 목록을 조회합니다.
     * @param request 택시 목록 조회 요청 데이터
     * @return 택시 목록 응답 데이터
     */
    @PostMapping("/list")
    ResponseEntity<List<TaxiSelectResponse>> listTaxi(@RequestBody TaxiListSelectRequest request) {
        List<TaxiSelectResponse> taxis = taxiService.listTaxi(request);
        return ResponseEntity.ok(taxis);
    }

    /**
     * 특정 택시를 조회합니다.
     * @param taxiSeq 택시 식별 번호
     * @return 특정 택시 응답 데이터
     */
    @GetMapping("/{taxiSeq}")
    ResponseEntity<TaxiSelectResponse> getTaxi(@PathVariable Long taxiSeq) {
        TaxiSelectResponse taxi = taxiService.getTaxi(taxiSeq);
        return ResponseEntity.ok(taxi);
    }

    /**
     * 택시 정보를 업데이트합니다.
     * @param request 택시 정보 업데이트 요청 데이터
     * @return 응답 엔티티
     */
    @PutMapping("/set")
    public ResponseEntity<?> updateTaxi(@RequestBody TaxiSetRequest request) {
        taxiService.setTaxi(request);
        return ResponseEntity.noContent().build();
    }

    /**
     * 택시 상태를 변경합니다.
     * @param request 택시 상태 변경 요청 데이터
     * @return 응답 엔티티
     */
    @PutMapping("/status")
    public ResponseEntity<?> statusTaxi(@RequestBody TaxiStatusRequest request) {
        taxiService.statusTaxi(request);
        return ResponseEntity.noContent().build();
    }

    /**
     * 택시를 시작합니다.
     * @param request 택시 시작 요청 데이터
     * @return 응답 엔티티
     */
    @PutMapping("/start")
    public ResponseEntity<?> startTaxi(@RequestBody TaxiStartRequest request) {
        taxiService.startTaxi(request);
        return ResponseEntity.noContent().build();
    }

    /**
     * 택시를 삭제합니다.
     * @param taxiSeq 택시 식별 번호
     * @return 응답 엔티티
     */
    @DeleteMapping("/delete/{taxiSeq}")
    ResponseEntity<?> deleteTaxi(@PathVariable Long taxiSeq) {
        taxiService.deleteTaxi(taxiSeq);
        return ResponseEntity.noContent().build();
    }

    /**
     * 택시 총 결제 금액(에상or실제)을 저장합니다.
     * @param request 택시 총 예상 결제 금액 요청 데이터
     * @return 응답 엔티티
     */
    @PutMapping("/setCost")
    ResponseEntity<?> setCost(@RequestBody TaxiSetCostRequest request) {
        taxiService.setCost(request);
        return ResponseEntity.noContent().build();
    }
    
    // 최종 비용 계산
    @PostMapping("/finalCost")
    ResponseEntity<TaxiFinalCostResponse> finalCost(@RequestBody TaxiFInalCostRequest request) {
        TaxiFinalCostResponse response = taxiService.finalCost(request);
        return ResponseEntity.ok(response);
    }

    // 정산방 연결
    @PutMapping("/setParty")
    ResponseEntity<?> setParty(@RequestBody TaxiSetPartyRequest request) {
        taxiService.setParty(request);
        return ResponseEntity.noContent().build();
    }


    /**
     * 게스트를 추가합니다.
     * @param request 게스트 추가 요청 데이터
     * @return 응답 엔티티
     */
    @PostMapping("/guest/create")
    ResponseEntity<?> joinGuest(@RequestBody GuestCreateRequest request) {
        taxiGuestService.joinGuest(request);
        return ResponseEntity.noContent().build();
    }

    /**
     * 게스트를 삭제합니다.
     * @param request 게스트 삭제 요청 데이터
     * @return 응답 엔티티
     */
    @PostMapping("/guest/delete")
    ResponseEntity<?> deleteGuest(@RequestBody GuestDeleteRequest request) {
        taxiGuestService.deleteGuest(request);
        return ResponseEntity.noContent().build();
    }

    /**
     * 특정 게스트를 조회합니다.
     * @param userSeq 사용자 식별 번호
     * @return 특정 게스트 응답 데이터
     */
    @GetMapping("/guest/{userSeq}")
    ResponseEntity<GuestSelectResponse> getGuest(@PathVariable Long userSeq) {
        GuestSelectResponse guest = taxiGuestService.getGuest(userSeq);
        return ResponseEntity.ok(guest);
    }

    /**
     * 특정 택시의 모든 게스트를 조회합니다.
     * @param taxiSeq 택시 식별 번호
     * @return 게스트 목록 응답 데이터
     */
    @GetMapping("/guests/{taxiSeq}")
    ResponseEntity<List<GuestSelectResponse>> getGuests(@PathVariable Long taxiSeq) {
        List<GuestSelectResponse> guests = taxiGuestService.getGuests(taxiSeq);
        return ResponseEntity.ok(guests);
    }

    /**
     * 택시 경로를 조회합니다.
     * @param taxiSeq 택시 식별 번호
     * @return 경로 목록 응답 데이터
     */
    @GetMapping("/path/{taxiSeq}")
    ResponseEntity<List<DestinationListResponse>> getDestinations(@PathVariable Long taxiSeq) {
        List<DestinationListResponse> list = taxiGuestService.getDestinations(taxiSeq);
        return ResponseEntity.ok(list);
    }

    /**
     * 택시파티 목적지 다음 순위를 조회합니다.
     * @param taxiSeq 택시 식별 번호
     * @return 다음 순위 응답 데이터
     */
    @GetMapping("/rank/{taxiSeq}")
    ResponseEntity<?> getRank(@PathVariable Long taxiSeq) {
        int rank = taxiGuestService.getRank(taxiSeq);
        return ResponseEntity.ok(rank);
    }

    /**
     * 사용자가 탑승 중인지 확인합니다.
     * @param userSeq 사용자 식별 번호
     * @return 탑승 여부 응답 데이터
     */
    @GetMapping("/isJoined/{userSeq}")
    public ResponseEntity<?> isJoined(@PathVariable Long userSeq) {
        return ResponseEntity.ok(taxiGuestService.isJoined(userSeq));
    }

    /**
     * 게스트의 목적지 및 비용을 설정합니다.
     * @param request 게스트 목적지 및 비용 설정 요청 데이터
     * @return 응답 엔티티
     */
    @PutMapping("/guest/set/destinataionAndCost")
    public ResponseEntity<?> setDestinationAndCost(@RequestBody GuestSetDestinationAndCostRequest request) {
        taxiGuestService.setDestinationAndCost(request);
        return ResponseEntity.noContent().build();
    }

    /**
     * 게스트의 목적지 순위를 설정합니다.
     * @param request 게스트 목적지 순위 설정 요청 데이터
     * @return 응답 엔티티
     */
    @PutMapping("/guest/set/rank")
    public ResponseEntity<?> setRank(@RequestBody GuestSetRankRequest request) {
        taxiGuestService.setRank(request);
        return ResponseEntity.noContent().build();
    }
}
