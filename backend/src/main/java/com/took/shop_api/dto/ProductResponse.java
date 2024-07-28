package com.took.shop_api.dto;

import com.took.shop_api.entity.Product;
import lombok.Getter;

@Getter
public class ProductResponse {

    private final Long productSeq;

    private final String productName;

    private final String optionDetails;

    private final String etc;

    public ProductResponse(Product product) {
        this.productSeq = product.getProductSeq();
        this.productName = product.getProductName();
        this.optionDetails = product.getOptionDetails();
        this.etc = product.getEtc();
    }
}
