package com.ssafy.shop_api.dto;

import com.ssafy.shop_api.entity.Shop;
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
    private final Shop.statusType status;
    private final LocalDateTime createAt;

    public ShopResponse(Shop shop) {
        this.shopSeq = shop.getShopSeq();
        this.userSeq = shop.getUserSeq();
        this.roomSeq = shop.getRoomSeq();
        this.title = shop.getTitle();
        this.content = shop.getContent();
        this.hit = shop.getHit();
        this.item = shop.getItem();
        this.place = shop.getPlace();
        this.status = shop.getStatus();
        this.createAt = shop.getCreateAt();
        this.site = shop.getSite();
    }
}
