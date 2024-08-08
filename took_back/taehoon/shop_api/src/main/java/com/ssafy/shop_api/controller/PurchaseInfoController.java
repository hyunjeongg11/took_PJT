package com.ssafy.shop_api.controller;

import com.ssafy.shop_api.dto.*;
import com.ssafy.shop_api.service.PurchaseInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/purchase")
public class PurchaseInfoController {

    private final PurchaseInfoService purchaseInfoService;

    @PostMapping("/save")
    public ResponseEntity<?> savePurchaseInfo(@RequestBody AddPurchaseInfo request) {
        purchaseInfoService.savePurchaseInfo(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/selectAll/{id}")
    public ResponseEntity<?> findByShopSeq(@PathVariable long id) {
        PurchaseInfoListResponse info = purchaseInfoService.findByShopSeq(id);
        return ResponseEntity.ok()
                .body(info);
    }

    @GetMapping("/select/{shopSeq}/{userSeq}")
    public ResponseEntity<?> findPurchaseInfo(@PathVariable long shopSeq, @PathVariable long userSeq) {
        PurchaseInfoResponse purchaseInfo = purchaseInfoService.findById(shopSeq, userSeq);

        return ResponseEntity.ok()
                .body(purchaseInfo);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePurchaseInfo(@PathVariable long id) {
        purchaseInfoService.delete(id);

        return ResponseEntity.ok()
                .build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePurchaseInfo(@PathVariable long id,
                                           @RequestBody UpdatePurchaseRequest request) {
        purchaseInfoService.update(id, request);

        return ResponseEntity.ok().build();
    }
}
