package com.ssafy.shop_api.controller;

import com.ssafy.shop_api.dto.*;
import com.ssafy.shop_api.entity.PurchaseInfo;
import com.ssafy.shop_api.service.PurchaseInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/purchase")
public class PurchaseInfoController {

    private final PurchaseInfoService purchaseInfoService;

    @PostMapping("/save")
    public ResponseEntity<?> savePurchaseInfo(@RequestBody PurchaseInfo request) {
        purchaseInfoService.savePurchaseInfo(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/selectAll/{id}")
    public ResponseEntity<?> findByShopSeq(@PathVariable long id) {
        List<PurchaseInfoResponse> info = purchaseInfoService.findByShopSeq(id)
                .stream()
                .map(PurchaseInfoResponse::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok()
                .body(info);
    }

    @GetMapping("/select/{id}")
    public ResponseEntity<?> findPurchaseInfo(@PathVariable long id) {
        PurchaseInfo purchaseInfo = purchaseInfoService.findById(id);

        return ResponseEntity.ok()
                .body(new PurchaseInfoResponse(purchaseInfo));
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
        PurchaseInfo updatePurchaseInfo = purchaseInfoService.update(id, request);

        return ResponseEntity.ok()
                .body(updatePurchaseInfo);
    }
}
