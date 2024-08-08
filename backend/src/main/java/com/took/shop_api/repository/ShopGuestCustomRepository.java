package com.took.shop_api.repository;

import com.took.shop_api.entity.Shop;

public interface ShopGuestCustomRepository {
    boolean areAllGuestsPickedUp(Shop shop);
}
