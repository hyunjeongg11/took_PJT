package com.took.shop_api.dto;

import com.took.shop_api.entity.Shop;
import com.took.user_api.entity.UserEntity;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ShopResponse {
    private final Long shopSeq;
    private final Long userSeq;
    private final Long roomSeq;
    private final String title;
    private final String content;
    private final int hit;
    private final String site;
    private final String item;
    private final String place;
    private final double lat;
    private final double lon;
    private final int count;
    private final int maxCount;
    private final Shop.statusType status;
    private final LocalDateTime createAt;
    private final String userName;
    private final int imageNo;

    public ShopResponse(Shop shop, UserEntity user) {
        this.shopSeq = shop.getShopSeq();
        this.userSeq = shop.getUser().getUserSeq();
        this.roomSeq = shop.getChatRoom().getRoomSeq();
        this.title = shop.getTitle();
        this.content = shop.getContent();
        this.hit = shop.getHit();
        this.item = shop.getItem();
        this.place = shop.getPlace();
        this.status = shop.getStatus();
        this.createAt = shop.getCreateAt();
        this.site = shop.getSite();
        this.lat = shop.getLat();
        this.lon = shop.getLon();
        this.count = shop.getCount();
        this.maxCount = shop.getMaxCount();
        this.userName = user.getUserName();
        this.imageNo = user.getImageNo();
    }
}
