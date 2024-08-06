package com.took.shop_api.service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.took.chat_api.entity.ChatRoom;
import com.took.chat_api.repository.ChatRoomRepository;
import com.took.shop_api.dto.*;
import com.took.shop_api.entity.*;
import com.took.shop_api.repository.ShopGuestRepository;
import com.took.shop_api.repository.ShopRepository;
import com.took.user_api.entity.UserEntity;
import com.took.user_api.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ShopService {

    private final ShopRepository shopRepository;
    private final ShopGuestRepository shopGuestRepository;
    private final UserRepository userRepository;
    private final ChatRoomRepository chatRoomRepository;

    private final JPAQueryFactory queryFactory;

    @Transactional
    public Shop save(AddShopRequest request) {
        ChatRoom chatRoom = chatRoomRepository.findById(request.getRoomSeq()).orElseThrow();
        Shop shop = Shop.builder().user(userRepository.findByUserSeq(request.getUserSeq()))
                .chatRoom(chatRoom)
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
    public List<ShopResponse> findShopsByIds(List<Long> id) {
        List<UserEntity> users = userRepository.findAllById(id);
        List<ShopResponse> shops = shopRepository.findByUserInAndStatus(users, Shop.statusType.OPEN)
                .stream()
                .map(shop -> {
                    // Shop 객체에서 직접 UserEntity 정보 가져오기
                    UserEntity user = shop.getUser();
                    return new ShopResponse(shop, user);
                })
                .collect(Collectors.toList());
        return shops;
    }

    @Transactional
    public ShopResponse findById(Long id) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        UserEntity user = userRepository.findByUserSeq(shop.getUser().getUserSeq());

        shop.updateHit(1);

        return new ShopResponse(shop, user);
    }

    @Transactional
    public void delete(Long id) {
//        QShopGuest qShopGuest = QShopGuest.shopGuest;
//        queryFactory.delete(qShopGuest).where(qShopGuest.shop.shopSeq.eq(id)).execute();
//
//        QShipInfo qShipInfo = QShipInfo.shipInfo;
//        queryFactory.delete(qShipInfo).where(qShipInfo.shop.shopSeq.eq(id)).execute();
//
//        QPurchaseInfo qPurchaseInfo = QPurchaseInfo.purchaseInfo;
//        queryFactory.delete(qPurchaseInfo).where(qPurchaseInfo.shop.shopSeq.eq(id)).execute();
//
//        QShop shop = QShop.shop;
//        queryFactory.delete(shop).where(shop.shopSeq.eq(id)).execute();
        shopRepository.deleteById(id);
    }

    @Transactional
    public Shop update(Long id, UpdateShopRequest request) {
        Shop shop = shopRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));

        shop.update(request.getTitle(), request.getContent(), request.getItem(), request.getSite(), request.getPlace(), request.getMaxCount());

        return shop;
    }

    @Transactional
    public Shop updateStatus(Long id, UpdateStatusShopRequest request) {
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
    public void exit(Long shopSeq, Long userSeq){
        Shop shop = shopRepository.findById(shopSeq).orElseThrow();
        UserEntity user = userRepository.findByUserSeq(userSeq);
        shopGuestRepository.deleteByShopAndUser(shop, user);

        shop.updateCount(-1);
    }

    @Transactional
    public void pickUp(Long shopSeq, Long userSeq) {
        Shop shop = shopRepository.findById(shopSeq)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + shopSeq));

        UserEntity user = userRepository.findByUserSeq(userSeq);
        ShopGuest shopGuest = shopGuestRepository.findByShopAndUser(shop, user);
        shopGuest.updatePickUp(true);
        shopGuestRepository.save(shopGuest);
    }

    @Transactional
    public boolean pickUpCheck(Long shopSeq) {
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
