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
        Shop shop = Shop.builder().user(userRepository.findByUserSeq(request.getUserSeq()))
                .roomSeq(request.getRoomSeq())
                .title(request.getTitle())
                .content(request.getContent())
                .item(request.getItem())
                .site(request.getSite())
                .place(request.getPlace())
                .maxCount(request.getMaxCount())
                .lat(request.getLat())
                .lon(request.getLon())
                .build();
        shopRepository.save(shop);

        UserEntity user = userRepository.findByUserSeq(request.getUserSeq());
        ShopGuest shopGuest = ShopGuest.builder().shop(shop).user(user).build();
        shopGuestRepository.save(shopGuest);
        return shop;
    }

    @Transactional
    public List<Shop> findShopsByIds(List<Long> id) {
        List<UserEntity> user = userRepository.findAllById(id);
        return shopRepository.findByUserInAndStatus(user, Shop.statusType.OPEN);
    }

    @Transactional
    public Shop findById(long id) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        shop.updateHit(1);
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
        shop.updateStatus(request.getStatus());
        return shop;
    }

    @Transactional
    public boolean userEnterShop(AddShopGuest request) {
        Shop shop = shopRepository.findById(request.getShopSeq()).orElseThrow();
        UserEntity user = userRepository.findByUserSeq(request.getUserSeq());
        ShopGuest shopGuest = shopGuestRepository.findByShopAndUser(shop, user);
        if (shopGuest == null){
            if (shop.getMaxCount() > shop.getCount()){
                shop.updateCount(1);
                shopGuest = ShopGuest.builder().
                        shop(shop).
                        user(userRepository.findByUserSeq(request.getUserSeq())).
                        pickUp(false).
                        build();
                shopGuestRepository.save(shopGuest);
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
        Shop shop = shopRepository.findById(shopSeq).orElseThrow();
        UserEntity user = userRepository.findByUserSeq(userSeq);
        shopGuestRepository.deleteByShopAndUser(shop, user);

        shop.updateCount(-1);
    }

    @Transactional
    public void pickUp(long shopSeq, long userSeq) {
        Shop shop = shopRepository.findById(shopSeq)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + shopSeq));

        UserEntity user = userRepository.findByUserSeq(userSeq);
        ShopGuest shopGuest = shopGuestRepository.findByShopAndUser(shop, user);
        shopGuest.updatePickUp(true);
        shopGuestRepository.save(shopGuest);
    }

    @Transactional
    public boolean pickUpCheck(long shopSeq) {
        Shop shop = shopRepository.findById(shopSeq).orElseThrow();
        List<ShopGuest> list = shopGuestRepository.findAllByShop(shop);
        for (ShopGuest shopGuest : list){
            if (!shopGuest.isPickUp()){
                return false;
            }
        }
        return true;
    }
}
