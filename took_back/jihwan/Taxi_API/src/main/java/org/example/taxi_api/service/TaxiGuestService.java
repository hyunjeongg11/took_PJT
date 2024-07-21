package org.example.taxi_api.service;

import lombok.RequiredArgsConstructor;
import org.example.taxi_api.dto.*;
import org.example.taxi_api.entity.Taxi;
import org.example.taxi_api.entity.TaxiGuest;
import org.example.taxi_api.repository.TaxiGuestRepository;
import org.example.taxi_api.repository.TaxiRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaxiGuestService {

    private final TaxiRepository taxiRepository;
    private final TaxiGuestRepository taxiGuestRepository;

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
    }

    @Transactional
    public void deleteGuest(GuestDeleteRequest request) {
        Taxi taxi = taxiRepository.findByTaxiSeq(request.getTaxiSeq());
        TaxiGuest guest = taxiGuestRepository.findByUserSeqAndTaxi(request.getUserSeq(), taxi);
        taxiGuestRepository.delete(guest);
    }

    @Transactional
    public int getRank(Long taxiSeq) {
        return taxiGuestRepository.findNextRankByTaxiSeq(taxiSeq);
    }

    @Transactional
    public List<GuestListSelectResponse> getGuests(Long taxiSeq) {
        Taxi taxi = taxiRepository.findByTaxiSeq(taxiSeq);
        List<TaxiGuest> guests = taxiGuestRepository.findByTaxi(taxi);
        return guests.stream()
                .map(GuestListSelectResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<DestinationListResponse> getDestinations(Long taxiSeq) {
        List<TaxiGuest> guests = taxiGuestRepository.findDestinationsByTaxiSeqOrderedByRouteRank(taxiSeq);
        return guests.stream()
                .map(DestinationListResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public GuestSelectResponse getGuest(Long userSeq) {
        TaxiGuest guest = taxiGuestRepository.findByUserSeq(userSeq);
        return new GuestSelectResponse(guest);
    }

    public boolean isJoined(Long userSeq) {
        return taxiGuestRepository.existsByUserSeq(userSeq);
    }
}
