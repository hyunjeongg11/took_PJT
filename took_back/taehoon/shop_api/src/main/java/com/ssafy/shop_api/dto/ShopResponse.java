package com.ssafy.shop_api.dto;

import com.ssafy.shop_api.entity.Shop;
import lombok.Getter;

@Getter
public class ShopResponse {
    private final String title;
    private final String content;
    private final int hit;
    private final String item;
    private final String place;

    public ShopResponse(Shop shop) {
        this.title = shop.getTitle();
        this.content = shop.getContent();
        this.hit = shop.getHit();
        this.item = shop.getItem();
        this.place = shop.getPlace();
    }
}
