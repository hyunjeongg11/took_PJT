package org.example.taxi_api.service;

import lombok.RequiredArgsConstructor;
import org.example.taxi_api.dto.*;
import org.example.taxi_api.entity.Taxi;
import org.example.taxi_api.repository.TaxiRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service  // 이 클래스가 서비스 레이어의 빈으로 등록됨을 나타냅니다.
@RequiredArgsConstructor  // Lombok을 사용하여 모든 final 필드를 매개변수로 가지는 생성자를 자동으로 생성합니다.
public class TaxiService {

    private final TaxiRepository taxiRepository;  // TaxiRepository를 통해 데이터베이스 작업을 처리합니다.

    /**
     * 새로운 Taxi 엔티티를 생성하고 데이터베이스에 저장합니다.
     * @param request TaxiCreateRequest 객체로, 택시 생성에 필요한 정보를 담고 있습니다.
     */
    @Transactional
    public void createTaxi(TaxiCreateRequest request) {
        // Taxi 엔티티를 빌더 패턴을 사용하여 생성합니다.
        Taxi taxi = Taxi.builder()
                .gender(request.isGender())  // 성별 여부 설정
                .count(1)  // 현재 인원 수를 1로 설정
                .max(request.getMax())  // 최대 인원 수 설정
                .status(Taxi.Status.OPEN)  // 상태를 OPEN으로 설정
                .createdAt(LocalDateTime.now())  // 생성 일시를 현재 시간으로 설정
                .finishTime(LocalDateTime.now().plusHours(1))  // 종료 일시에 현재 시간에서 1시간을 더한 값으로 설정
                .master(request.getUserSeq())  // 결제자 설정
                .roomSeq(request.getRoomSeq())  // 채팅방 참조 설정
                .userSeq(request.getUserSeq())  // 작성자 설정
                .build();
        // 생성된 Taxi 엔티티를 데이터베이스에 저장합니다.
        taxiRepository.save(taxi);
    }

    @Transactional
    public List<TaxiListSelectResponse> listTaxi(TaxiListSelectRequest request) {
        List<Taxi> taxis = taxiRepository.findTaxisByUserSeqs(request.getUserSeqs());
        return taxis.stream()
                .map(TaxiListSelectResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteTaxi(Long taxiSeq) {
        Taxi taxi = taxiRepository.findByTaxiSeq(taxiSeq);
        taxiRepository.delete(taxi);
    }

    @Transactional
    public TaxiSelectResponse getTaxi(Long taxiSeq) {
        Taxi taxi = taxiRepository.findByTaxiSeq(taxiSeq);
        return new TaxiSelectResponse(taxi);
    }

    @Transactional
    public void setTaxi(TaxiSetRequest request) {
        Taxi taxi = taxiRepository.findByTaxiSeq(request.getTaxiSeq());
        taxi.setMaster(request.getMaster());
        taxi.setMax(request.getMax());
        taxi.setGender(request.isGender());
        taxiRepository.save(taxi);
    }


    @Transactional
    public void statusTaxi(TaxiStatusRequest request) {
        Taxi taxi = taxiRepository.findByTaxiSeq(request.getTaxiSeq());
        switch (taxi.getStatus()) {
            case OPEN:
                taxi.setStatus(Taxi.Status.FILLED);
                break;
            case FILLED:
                taxi.setStatus(Taxi.Status.BOARD);
                break;
            case BOARD:
                taxi.setStatus(Taxi.Status.DONE);
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + taxi.getStatus());
        }
        taxiRepository.save(taxi);
    }

    @Transactional
    public void startTaxi(TaxiStartRequest request) {
        Taxi taxi = taxiRepository.findByTaxiSeq(request.getTaxiSeq());
        taxi.setStartLat(request.getStartLat());
        taxi.setStartLon(request.getStartLon());
        taxi.setCost(request.getCost());
        taxiRepository.save(taxi);
    }
}
