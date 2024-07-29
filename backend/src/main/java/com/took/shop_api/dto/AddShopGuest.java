package com.took.shop_api.dto;

import com.took.shop_api.entity.ShopGuest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddShopGuest {

    private long shopSeq;

    private long userSeq;


}
