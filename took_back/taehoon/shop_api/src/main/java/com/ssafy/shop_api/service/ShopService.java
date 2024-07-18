package com.ssafy.shop_api.service;

import com.ssafy.shop_api.dto.AddShopRequest;
import com.ssafy.shop_api.dto.UpdateShopRequest;
import com.ssafy.shop_api.entity.Shop;
import com.ssafy.shop_api.repository.ShopRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShopService {

    private final ShopRepository shopRepository;

    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    public Shop save(AddShopRequest request) {
        return shopRepository.save(request.toEntity());
    }

    public List<Shop> findAll() {
        return shopRepository.findAll();
    }

    public Shop findById(long id) {
        return shopRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));
    }

    public void delete(long id) {
        shopRepository.deleteById(id);
    }

    @Transactional
    public Shop update(long id, UpdateShopRequest request) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));

        shop.update(request.getTitle(), request.getContent());

        return shop;
    }
}
