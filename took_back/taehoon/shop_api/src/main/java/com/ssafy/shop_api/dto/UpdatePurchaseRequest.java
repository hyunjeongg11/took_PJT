package com.ssafy.shop_api.dto;

import com.ssafy.shop_api.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdatePurchaseRequest {
    private int price;

    private int shipCost;

    private List<Product> productList;
}
