package com.took.shop_api.dto;

import com.took.shop_api.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddProduct {

    private String productName;

    private String optionDetails;

    private String etc;

    public Product toEntity() {
        return Product.builder()
                .productName(productName)
                .optionDetails(optionDetails)
                .etc(etc)
                .build();
    }
}
