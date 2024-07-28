package com.took.shop_api.dto;

import com.took.shop_api.entity.Shop;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddShopRequest {

    private Long roomSeq;

    private Long userSeq;

    private String title;

    private String content;

    private String item;

    private String site;

    private String place;

    private int count = 1;

    private double lat;

    private double lon;

    private int maxCount;

    public Shop toEntity() {
        return Shop.builder()
                .roomSeq(roomSeq)
                .userSeq(userSeq)
                .title(title)
                .content(content)
                .item(item)
                .site(site)
                .place(place)
                .count(count)
                .lat(lat)
                .lon(lon)
                .maxCount(maxCount)
                .build();
    }
}
