package com.took.shop_api.dto;

import com.took.shop_api.entity.Shop;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateStatusShopRequest {

    @Enumerated(EnumType.STRING)
    private Shop.statusType status;
}
