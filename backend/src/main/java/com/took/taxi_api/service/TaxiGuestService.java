package com.took.taxi_api.service;

import com.took.taxi_api.dto.*;
import com.took.taxi_api.entity.Taxi;
import com.took.taxi_api.entity.TaxiGuest;
import com.took.taxi_api.repository.TaxiGuestRepository;
import com.took.taxi_api.repository.TaxiRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service  // 이 클래스가 서비스 레이어의 빈으로 등록됨을 나타냅니다.
@RequiredArgsConstructor  // Lombok을 사용하여 모든 final 필드를 매개변수로 가지는 생성자를 자동으로 생성합니다.
public class TaxiGuestService {

    private final TaxiRepository taxiRepository;  // TaxiRepository를 통해 데이터베이스 작업을 처리합니다.
    private final TaxiGuestRepository taxiGuestRepository;  // TaxiGuestRepository를 통해 데이터베이스 작업을 처리합니다.

    /**
     * 새로운 TaxiGuest 엔티티를 생성하고 데이터베이스에 저장합니다.
     * @param request GuestCreateRequest 객체로, 게스트 추가에 필요한 정보를 담고 있습니다.
     */
    @Transactional
    public void joinGuest(GuestCreateRequest request) {
        Taxi taxi = taxiRepository.findByTaxiSeq(request.getTaxiSeq());
        TaxiGuest taxiGuest = TaxiGuest.builder().taxi(taxi).userSeq(request.getUserSeq())
                .cost(request.getCost())
                .destiName(request.getDestiName())
                .destiLat(request.getDestiLat()).destiLon(request.getDestiLon())
                .routeRank(request.getRouteRank())
                .build();
        taxiGuestRepository.save(taxiGuest);

        taxi.setCount(taxi.getCount() + 1);
        taxiRepository.save(taxi);
    }

    /**
     * 특정 게스트를 삭제합니다.
     * @param request GuestDeleteRequest 객체로, 게스트 삭제에 필요한 정보를 담고 있습니다.
     */
    @Transactional
    public void deleteGuest(GuestDeleteRequest request) {
        Taxi taxi = taxiRepository.findByTaxiSeq(request.getTaxiSeq());
        TaxiGuest guest = taxiGuestRepository.findByUserSeqAndTaxi(request.getUserSeq(), taxi);
        taxiGuestRepository.delete(guest);

        taxi.setCount(taxi.getCount() - 1);
        taxiRepository.save(taxi);
    }

    /**
     * 특정 택시의 다음 목적지 순위를 조회합니다.
     * @param taxiSeq 택시 번호
     * @return 다음 목적지 순위
     */
    @Transactional
    public int getRank(Long taxiSeq) {
        return taxiGuestRepository.findNextRankByTaxiSeq(taxiSeq);
    }

    /**
     * 특정 택시의 모든 게스트를 조회합니다.
     * @param taxiSeq 택시 번호
     * @return 게스트 목록
     */
    @Transactional
    public List<GuestSelectResponse> getGuests(Long taxiSeq) {
        Taxi taxi = taxiRepository.findByTaxiSeq(taxiSeq);
        List<TaxiGuest> guests = taxiGuestRepository.findByTaxi(taxi);
        return guests.stream()
                .map(GuestSelectResponse::new)
                .collect(Collectors.toList());
    }

    /**
     * 특정 택시의 경로를 조회합니다.
     * @param taxiSeq 택시 번호
     * @return 경로 목록
     */
    @Transactional
    public List<DestinationListResponse> getDestinations(Long taxiSeq) {
        List<TaxiGuest> guests = taxiGuestRepository.findDestinationsByTaxiSeqOrderedByRouteRank(taxiSeq);
        return guests.stream()
                .map(DestinationListResponse::new)
                .collect(Collectors.toList());
    }

    /**
     * 특정 게스트를 조회합니다.
     * @param userSeq 사용자 번호
     * @return 게스트 정보
     */
    @Transactional
    public GuestSelectResponse getGuest(Long userSeq) {
        TaxiGuest guest = taxiGuestRepository.findByUserSeq(userSeq);
        return new GuestSelectResponse(guest);
    }

    /**
     * 특정 사용자가 탑승했는지 확인합니다.
     * @param userSeq 사용자 번호
     * @return 탑승 여부
     */
    @Transactional
    public boolean isJoined(Long userSeq) {
        return taxiGuestRepository.existsByUserSeq(userSeq);
    }

    /**
     * 게스트의 목적지 및 비용을 설정합니다.
     * @param request GuestSetDestinationAndCostRequest 객체로, 목적지 및 비용 설정에 필요한 정보를 담고 있습니다.
     */
    @Transactional
    public void setDestinationAndCost(GuestSetDestinationAndCostRequest request) {
        TaxiGuest taxiGuest = taxiGuestRepository.findByGuestSeq(request.getGuestSeq());
        taxiGuest.setDestiName(request.getDestiName());
        taxiGuest.setDestiLat(request.getDestiLat());
        taxiGuest.setDestiLon(request.getDestiLon());
        taxiGuest.setCost(request.getCost());
        taxiGuest.setRouteRank(request.getRouteRank());
        taxiGuestRepository.save(taxiGuest);
    }

    /**
     * 게스트의 목적지 순위를 설정합니다.
     * @param request GuestSetRankRequest 객체로, 순위 설정에 필요한 정보를 담고 있습니다.
     */
    @Transactional
    public void setRank(GuestSetRankRequest request) {
        Taxi taxi = taxiRepository.findByTaxiSeq(request.getTaxiSeq());
        List<TaxiGuest> guests = taxiGuestRepository.findByTaxiAndDestiName(taxi, request.getDestiName());
        for (TaxiGuest guest : guests) {
            guest.setRouteRank(request.getRouteRank());
        }
        taxiGuestRepository.saveAll(guests);
    }
}
