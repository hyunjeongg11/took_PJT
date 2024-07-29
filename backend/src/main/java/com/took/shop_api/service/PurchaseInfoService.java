package com.took.shop_api.service;

import com.took.shop_api.dto.*;
import com.took.shop_api.entity.Product;
import com.took.shop_api.entity.PurchaseInfo;
import com.took.shop_api.entity.Shop;
import com.took.shop_api.repository.ProductRepository;
import com.took.shop_api.repository.PurchaseInfoRepository;
import com.took.shop_api.repository.ShopRepository;
import com.took.user_api.entity.UserEntity;
import com.took.user_api.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseInfoService {

    private final PurchaseInfoRepository purchaseInfoRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ShopRepository shopRepository;

    @Transactional
    public void savePurchaseInfo(AddPurchaseInfo request) {
        UserEntity user = userRepository.findByUserSeq(request.getUserSeq());
        Shop shop = shopRepository.findById(request.getShopSeq()).orElseThrow();


        PurchaseInfo purchaseInfo = purchaseInfoRepository.save(PurchaseInfo.builder()
                .user(user)
                .shop(shop)
                .price(request.getPrice())
                .shipCost(request.getShipCost())
                .build()
        );

        for (AddProduct p: request.getProductList()){
            Product product = Product.builder()
                    .purchaseInfo(purchaseInfo)
                    .productName(p.getProductName())
                    .optionDetails(p.getOptionDetails())
                    .etc(p.getEtc())
                    .build();
            productRepository.save(product);
        }
    }

    @Transactional
    public PurchaseInfoListResponse findByShopSeq(long id) {
        List<PurchaseInfo> purchaseInfoList = purchaseInfoRepository.findByShopSeq(id);
        List<PurchaseInfoResponse> result = new ArrayList<>();
        int total = 0;
        for (PurchaseInfo purchaseInfo : purchaseInfoList) {
            long purchaseSeq = purchaseInfo.getPurchaseSeq();
            List<Product> productList = productRepository.findByPurchaseSeq(purchaseSeq);
            List<ProductResponse> productResponseList = productList.stream()
                    .map(ProductResponse::new)
                    .collect(Collectors.toList());
            PurchaseInfoResponse purchaseInfoResponse = new PurchaseInfoResponse(purchaseInfo);
            purchaseInfoResponse.setProductList(productResponseList);
            result.add(purchaseInfoResponse);
            total += purchaseInfoResponse.getTotal();
        }
        PurchaseInfoListResponse response = new PurchaseInfoListResponse(result, total);
        return response;
    }

    @Transactional
    public PurchaseInfoResponse findById(long shopSeq, long userSeq) {
        PurchaseInfo purchaseInfo = purchaseInfoRepository.findByShopSeqAndUserSeq(shopSeq, userSeq);
        long purchaseSeq = purchaseInfo.getPurchaseSeq();
        List<Product> productList = productRepository.findByPurchaseSeq(purchaseSeq);
        List<ProductResponse> productResponseList = productList.stream()
                .map(ProductResponse::new)
                .collect(Collectors.toList());
        PurchaseInfoResponse purchaseInfoResponse = new PurchaseInfoResponse(purchaseInfo);
        purchaseInfoResponse.setProductList(productResponseList);
        return purchaseInfoResponse;
    }

    @Transactional
    public void delete(long id) {
        purchaseInfoRepository.deleteById(id);
    }

    @Transactional
    public void update(long id, UpdatePurchaseRequest request) {
        PurchaseInfo purchaseInfo = purchaseInfoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));

        purchaseInfo.update(request.getPrice(), request.getShipCost());

        productRepository.deleteByPurchaseSeq(id);
        for (UpdateProductRequest p : request.getProductList()){
            Product product = Product.builder()
                    .purchaseInfo(purchaseInfo)
                    .productName(p.getProductName())
                    .optionDetails(p.getOptionDetails())
                    .etc(p.getEtc())
                    .build();
            productRepository.save(product);
        }
    }

}
