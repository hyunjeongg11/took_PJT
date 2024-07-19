package com.ssafy.shop_api.dto;

import com.ssafy.shop_api.entity.Product;
import com.ssafy.shop_api.entity.PurchaseInfo;
import lombok.Getter;

import java.util.List;

@Getter
public class ProductResponse {

    private final Long productSeq;

    private final String productName;

    private final String optionDetails;

    public ProductResponse(Product product) {
        this.productSeq = product.getProductSeq();
        this.productName = product.getProductName();
        this.optionDetails = product.getOptionDetails();
    }
}
