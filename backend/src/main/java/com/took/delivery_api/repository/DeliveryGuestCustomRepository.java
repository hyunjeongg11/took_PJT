package com.took.delivery_api.repository;

import com.took.delivery_api.entity.Delivery;

public interface DeliveryGuestCustomRepository {
    boolean areAllGuestsPickedUp(Delivery delivery);
}
