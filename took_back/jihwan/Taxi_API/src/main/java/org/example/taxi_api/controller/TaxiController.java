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

    private final TaxiService taxiService;
    private final TaxiGuestService taxiGuestService;

    @PostMapping("/create")
    ResponseEntity<?> createTaxi (@RequestBody TaxiCreateRequest request) {
        taxiService.createTaxi(request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/list")
    ResponseEntity<List<TaxiListSelectResponse>> listTaxi (@RequestBody TaxiListSelectRequest request) {
        List<TaxiListSelectResponse> taxis = taxiService.listTaxi(request);
        return ResponseEntity.ok(taxis);
    }

    @GetMapping("/{taxiSeq}")
    ResponseEntity<TaxiSelectResponse> getTaxi(@PathVariable Long taxiSeq) {
        TaxiSelectResponse taxi = taxiService.getTaxi(taxiSeq);
        return ResponseEntity.ok(taxi);
    }

    @PutMapping("/set")
    public ResponseEntity<?> updateTaxi(@RequestBody TaxiSetRequest request) {
        taxiService.setTaxi(request);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/status")
    public ResponseEntity<?> statusTaxi(@RequestBody TaxiStatusRequest request) {
        taxiService.statusTaxi(request);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/start")
    public ResponseEntity<?> startTaxi(@RequestBody TaxiStartRequest request) {
        taxiService.startTaxi(request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete/{taxiSeq}")
    ResponseEntity<?> deleteTaxi(@PathVariable Long taxiSeq) {
        taxiService.deleteTaxi(taxiSeq);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/guest/create")
    ResponseEntity<?> joinGuest(@RequestBody GuestCreateRequest request) {
        taxiGuestService.joinGuest(request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/guest/delete")
    ResponseEntity<?> deleteGuest(@RequestBody GuestDeleteRequest request) {
        taxiGuestService.deleteGuest(request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/guests/{taxiSeq}")
    ResponseEntity<List<GuestListSelectResponse>> getGuests(@PathVariable Long taxiSeq) {
        List<GuestListSelectResponse> guests = taxiGuestService.getGuests(taxiSeq);
        return ResponseEntity.ok(guests);
    }

    @GetMapping("/path/{taxiSeq}")
    ResponseEntity<List<DestinationListResponse>> getDestinations(@PathVariable Long taxiSeq) {
        List<DestinationListResponse> list = taxiGuestService.getDestinations(taxiSeq);
        return ResponseEntity.ok(list);
    }


    @GetMapping("/rank/{taxiSeq}")
    ResponseEntity<?> getRank(@PathVariable Long taxiSeq) {
        int rank = taxiGuestService.getRank(taxiSeq);
        return ResponseEntity.ok(rank);
    }


}
