package com.ssafy.shop_api.service;

import com.ssafy.shop_api.dto.AddShopGuest;
import com.ssafy.shop_api.dto.AddShopRequest;
import com.ssafy.shop_api.dto.UpdateShopRequest;
import com.ssafy.shop_api.dto.UpdateStatusShopRequest;
import com.ssafy.shop_api.entity.Shop;
import com.ssafy.shop_api.entity.ShopGuest;
import com.ssafy.shop_api.repository.ShopGuestRepository;
import com.ssafy.shop_api.repository.ShopRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ShopService {

    private final ShopRepository shopRepository;
    private final ShopGuestRepository shopGuestRepository;

    public Shop save(AddShopRequest request) {

        return shopRepository.save(request.toEntity());
    }

    public List<Shop> findShopsByIds(List<Long> id) {
        return shopRepository.findByUserSeqInAndStatus(id, Shop.statusType.OPEN);
    }

    @Transactional
    public Shop findById(long id) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));

        shop.setHit(shop.getHit() + 1);

        shopRepository.save(shop);

        return shop;
    }

    public void delete(long id) {
        shopRepository.deleteById(id);
    }

    @Transactional
    public Shop update(long id, UpdateShopRequest request) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));

        shop.update(request.getTitle(), request.getContent(), request.getItem(), request.getSite(), request.getPlace());

        return shop;
    }

    @Transactional
    public Shop updateStatus(long id, UpdateStatusShopRequest request) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));

        shop.setStatus(request.getStatus());

        return shop;
    }

    public boolean userEnterShop(AddShopGuest request) {
        ShopGuest shopGuest = shopGuestRepository.findByShopSeqAndUserSeq(request.getShopSeq(), request.getUserSeq());
        if (shopGuest == null){
            Shop shop = shopRepository.findById(request.getShopSeq());
            shopGuestRepository.save(request.toEntity());

            shop.setCount(shop.getCount() + 1);
            return true;
        }
        else{
            return false;
        }

    }
}
