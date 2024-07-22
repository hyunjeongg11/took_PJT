package org.example.delivery_api.service;

import lombok.RequiredArgsConstructor;
import org.example.delivery_api.repository.DeliveryGuestRepository;
import org.example.delivery_api.repository.DeliveryRepository;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class DeliveryGuestService {

    private final DeliveryRepository deliveryRepository;
    private final DeliveryGuestRepository deliveryGuestRepository;


}
