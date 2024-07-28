package com.took.shop_api.dto;

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

    private List<UpdateProductRequest> productList;
}
