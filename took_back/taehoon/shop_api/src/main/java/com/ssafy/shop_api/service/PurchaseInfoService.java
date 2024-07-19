package com.ssafy.shop_api.service;

import com.ssafy.shop_api.dto.ProductResponse;
import com.ssafy.shop_api.dto.PurchaseInfoResponse;
import com.ssafy.shop_api.dto.UpdatePurchaseRequest;
import com.ssafy.shop_api.entity.Product;
import com.ssafy.shop_api.entity.PurchaseInfo;
import com.ssafy.shop_api.entity.Shop;
import com.ssafy.shop_api.repository.ProductRepository;
import com.ssafy.shop_api.repository.PurchaseInfoRepository;
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

    // 물품 리스트 조회
    public List<Product> findProductById(Long id) {
        return productRepository.findAllById(id);
    }


    public void savePurchaseInfo(PurchaseInfo request) {
        for (Product product : request.getProductList()){
            product(request);
        }
        PurchaseInfo purchaseInfo = purchaseInfoRepository.save(request);
        for (Product product: request.
    }
    public List<PurchaseInfo> findByShopSeq(long id) {
        List<PurchaseInfo> list = purchaseInfoRepository.findByShopSeq(id);
        for (PurchaseInfo purchaseInfo : list){
            List<Product> products = productRepository.findByPurchaseInfo(purchaseInfo);
            for (Product product : products){
                product.setPurchaseInfo(null);
            }
            purchaseInfo.setProductList(products);
        }
        return list;
    }

    public PurchaseInfo findById(long id) {
        PurchaseInfo purchaseInfo = purchaseInfoRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        List<Product> products = productRepository.findByPurchaseInfo(purchaseInfo);
        for (Product product : products){
            product.setPurchaseInfo(null);
        }
        purchaseInfo.setProductList(products);
        return purchaseInfo;
    }

    public void delete(long id) {
        purchaseInfoRepository.deleteById(id);
    }

    @Transactional
    public PurchaseInfo update(long id, UpdatePurchaseRequest request) {
        PurchaseInfo purchaseInfo = purchaseInfoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        purchaseInfo.update(request.getPrice(), request.getShipCost(), request.getProductList());
        return purchaseInfo;
    }
}
