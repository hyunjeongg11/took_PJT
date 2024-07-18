package org.example.taxi_api.service;

import lombok.RequiredArgsConstructor;
import org.example.taxi_api.repository.TaxiRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaxiService {

    private final TaxiRepository taxiRepository;
}
