package com.ssafy.shop_api.service;

import com.ssafy.shop_api.dto.AddShipRequest;
import com.ssafy.shop_api.dto.AddShopRequest;
import com.ssafy.shop_api.dto.UpdateShipRequest;
import com.ssafy.shop_api.dto.UpdateShopRequest;
import com.ssafy.shop_api.entity.ShipInfo;
import com.ssafy.shop_api.entity.Shop;
import com.ssafy.shop_api.repository.ShipRepository;
import com.ssafy.shop_api.repository.ShopRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ShipService {

    private final ShipRepository shipRepository;

    public ShipInfo save(AddShipRequest request) {
        return shipRepository.save(request.toEntity());
    }

    public ShipInfo findByShopSeq(Long id){
        return shipRepository.findByShopSeq(id);
    }

    public void delete(Long id){
        shipRepository.deleteById(id);
    }

    @Transactional
    public ShipInfo update(long id, UpdateShipRequest request) {
        ShipInfo ship = shipRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));

        ship.update(request);

        return ship;
    }
}