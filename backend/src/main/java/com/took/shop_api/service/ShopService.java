package com.took.shop_api.service;

import com.took.shop_api.dto.AddShopGuest;
import com.took.shop_api.dto.AddShopRequest;
import com.took.shop_api.dto.UpdateShopRequest;
import com.took.shop_api.dto.UpdateStatusShopRequest;
import com.took.shop_api.entity.Shop;
import com.took.shop_api.entity.ShopGuest;
import com.took.shop_api.repository.ShopGuestRepository;
import com.took.shop_api.repository.ShopRepository;
import com.took.user_api.entity.UserEntity;
import com.took.user_api.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ShopService {

    private final ShopRepository shopRepository;
    private final ShopGuestRepository shopGuestRepository;
    private final UserRepository userRepository;

    @Transactional
    public Shop save(AddShopRequest request) {
        Shop shop = shopRepository.save(request.toEntity());
        UserEntity user = userRepository.findByUserSeq(request.getUserSeq());
        ShopGuest shopGuest = ShopGuest.builder().shopSeq(shop.getShopSeq())
                        .user(user).build();
        shopGuestRepository.save(shopGuest);
        return shop;
    }

    @Transactional
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

    @Transactional
    public void delete(long id) {
        shopRepository.deleteById(id);
    }

    @Transactional
    public Shop update(long id, UpdateShopRequest request) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));

        shop.update(request.getTitle(), request.getContent(), request.getItem(), request.getSite(), request.getPlace(), request.getMaxCount());

        return shop;
    }

    @Transactional
    public Shop updateStatus(long id, UpdateStatusShopRequest request) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));

        shop.setStatus(request.getStatus());

        return shop;
    }

    @Transactional
    public boolean userEnterShop(AddShopGuest request) {
            ShopGuest shopGuest = shopGuestRepository.findByShopSeqAndUserSeq(request.getShopSeq(), request.getUserSeq());
        if (shopGuest == null){
            Shop shop = shopRepository.findById(request.getShopSeq())
                    .orElseThrow(() -> new IllegalArgumentException("not found : " + request.getShopSeq()));;
            if (shop.getMaxCount() > shop.getCount()){
                shop.setCount(shop.getCount() + 1);
                shopGuestRepository.save(request.toEntity());
                return true;
            }
            else {
                return false;
            }
        }
        else{
            return false;
        }

    }

    @Transactional
    public void exit(long shopSeq, long userSeq){
        shopGuestRepository.deleteByShopSeqAndUserSeq(shopSeq, userSeq);
        Shop shop = shopRepository.findById(shopSeq)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + shopSeq));
        shop.setCount(shop.getCount() - 1);
        shopRepository.save(shop);
    }

    @Transactional
    public void pickUp(long shopSeq, long userSeq) {

        ShopGuest shopGuest = shopGuestRepository.findByShopSeqAndUserSeq(shopSeq, userSeq);
        shopGuest.setPickUp(true);
        shopGuestRepository.save(shopGuest);
    }

    @Transactional
    public boolean pickUpCheck(long shopSeq) {
        List<ShopGuest> list = shopGuestRepository.findAllByShopSeq(shopSeq);
        for (ShopGuest shopGuest : list){
            if (!shopGuest.isPickUp()){
                return false;
            }
        }
        return true;
    }
}
