package com.took.shop_api.service;

import com.took.shop_api.dto.*;
import com.took.shop_api.entity.Product;
import com.took.shop_api.entity.PurchaseInfo;
import com.took.shop_api.repository.ProductRepository;
import com.took.shop_api.repository.PurchaseInfoRepository;
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

    public void savePurchaseInfo(AddPurchaseInfo request) {
        PurchaseInfo purchaseInfo = purchaseInfoRepository.save(request.toEntity());
        long purchaseSeq =  purchaseInfo.getPurchaseSeq();
        for (AddProduct p: request.getProductList()){
            Product product = p.toEntity();
            product.setPurchaseSeq(purchaseSeq);
            productRepository.save(product);
        }
    }

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
            Product product = p.toEntity();
            product.setPurchaseSeq(id);
            productRepository.save(product);
        }
    }

}
