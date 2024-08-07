package com.took.shop_api.service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.took.chat_api.repository.ChatRoomRepository;
import com.took.delivery_api.dto.DeliverySelectResponse;
import com.took.delivery_api.entity.Delivery;
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
import java.util.Objects;
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

    @Transactional
    public boolean findGuestsById(long userSeq, long shopSeq) {
        UserEntity user = userRepository.findByUserSeq(userSeq);
        Shop shop = shopRepository.findById(shopSeq).orElseThrow();
        ShopGuest shopGuest = shopGuestRepository.findByShopAndUser(shop, user);
        return shopGuest == null;
    }

    @Transactional
    public ShopResponse findShopByRoom(Long roomSeq) {
        Shop shop = shopRepository.findByRoomSeq(roomSeq)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + roomSeq));
        UserEntity user = userRepository.findByUserSeq(shop.getUser().getUserSeq());

        shop.updateHit(1);

        return new ShopResponse(shop, user);
    }


    @Transactional
    public List<ShopResponse> findShopsByUserId(Long id) {

        List<Shop> shops = shopRepository.findAll();
        UserEntity user = userRepository.findByUserSeq(id);

        return shops.stream()
                .map(shop -> {
                    double shopLat = shop.getLat();
                    double shopLon = shop.getLon();
                    double distance = calculateDistance(user.getLat(), user.getLon(), shopLat, shopLon);
                    if (distance <= 1000) { // 거리 범위를 1000m로 설정
                        return new ShopResponse(shop, user);
                    } else {
                        return null;
                    }
                })
                .filter(Objects::nonNull) // null 값 필터링
                .collect(Collectors.toList());
    }

    // 두 지점 간의 거리 계산 (단위: m)
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        } else {
            double theta = lon1 - lon2;
            double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2))
                    + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                    * Math.cos(Math.toRadians(theta));
            dist = Math.acos(dist);
            dist = Math.toDegrees(dist);
            dist = dist * 60 * 1.1515 * 1.609344;  // km 단위로 변환
            return (dist * 1000);  // m 단위로 변환
        }
    }
}
