package org.example.taxi_api.controller;

import lombok.RequiredArgsConstructor;
import org.example.taxi_api.service.TaxiGuestService;
import org.example.taxi_api.service.TaxiService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/taxi")
public class TaxiController {

    private final TaxiService taxiService;
    private final TaxiGuestService taxiGuestService;

}
