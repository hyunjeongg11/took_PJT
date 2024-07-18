package com.ssafy.shop_api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateShopRequest {
    private String title;

    private String content;

    private String item;

    private String site;

    private String place;
}
