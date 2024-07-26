package com.ssafy.shop_api.dto;

import com.ssafy.shop_api.entity.ShopGuest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddShopGuest {

    private long shopSeq;

    private long userSeq;

    public ShopGuest toEntity() {
        return ShopGuest.builder()
                .shopSeq(shopSeq)
                .userSeq(userSeq)
                .build();
    }
}
