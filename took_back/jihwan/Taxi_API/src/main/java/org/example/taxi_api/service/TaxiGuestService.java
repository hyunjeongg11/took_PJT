package org.example.taxi_api.service;

import lombok.RequiredArgsConstructor;
import org.example.taxi_api.repository.TaxiGuestRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaxiGuestService {

    private TaxiGuestRepository taxiGuestRepository;
}
