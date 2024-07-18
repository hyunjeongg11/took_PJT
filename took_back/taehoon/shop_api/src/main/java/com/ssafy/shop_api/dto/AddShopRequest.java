package com.ssafy.shop_api.dto;

import com.ssafy.shop_api.entity.Shop;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddShopRequest {
    private String title;

    private String content;

    private String item;

    private String site;

    private String place;

    public Shop toEntity() {
        return Shop.builder()
                .title(title)
                .content(content)
                .item(item)
                .site(site)
                .place(place)
                .build();
    }
}
