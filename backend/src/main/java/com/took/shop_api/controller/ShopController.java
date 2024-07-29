package com.took.shop_api.controller;

import com.took.shop_api.dto.*;
import com.took.shop_api.entity.Shop;
import com.took.shop_api.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/shops")
public class ShopController {

    private final ShopService shopService;

    @PostMapping("/create")
    public ResponseEntity<Shop> addShop(@RequestBody AddShopRequest request) {
        Shop saveShop = shopService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(saveShop);
    }

    @PostMapping("/selectAll")
    public ResponseEntity<List<ShopResponse>> findShopsByIds(@RequestBody List<Long> id) {
        List<ShopResponse> shops = shopService.findShopsByIds(id)
                .stream()
                .map(ShopResponse::new)
                .collect(Collectors.toList());

                return ResponseEntity.ok()
                .body(shops);
    }

    @GetMapping("/select/{id}")
    public ResponseEntity<ShopResponse> findShop(@PathVariable long id) {
        Shop shop = shopService.findById(id);

        return ResponseEntity.ok()
                .body(new ShopResponse(shop));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteShop(@PathVariable long id) {
        shopService.delete(id);

        return ResponseEntity.ok()
                .build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Shop> updateShop(@PathVariable long id,
                                                 @RequestBody UpdateShopRequest request) {
        Shop updateShop = shopService.update(id, request);

        return ResponseEntity.ok()
                .body(updateShop);
    }

    @PutMapping("/update/status/{id}")
    public ResponseEntity<Shop> updateArticle(@PathVariable long id,
                                              @RequestBody UpdateStatusShopRequest request) {
        Shop updateStatusShop = shopService.updateStatus(id, request);

        return ResponseEntity.ok()
                .body(updateStatusShop);
    }

    @PostMapping("/enter")
    public ResponseEntity<?> userEnterShop(@RequestBody AddShopGuest request) {
        return ResponseEntity.ok(shopService.userEnterShop(request));
    }

    @DeleteMapping("/exit/{shopSeq}/{userSeq}")
    public ResponseEntity<?> userExitShop(@PathVariable long shopSeq, @PathVariable long userSeq){
        shopService.exit(shopSeq,userSeq);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/pickUp/{shopSeq}/{userSeq}")
    public ResponseEntity<?> userPickUp(@PathVariable long shopSeq, @PathVariable long userSeq) {
        shopService.pickUp(shopSeq, userSeq);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/pickUpCheck/{shopSeq}")
    public ResponseEntity<?> pickUpCheck(@PathVariable long shopSeq){
        boolean check = shopService.pickUpCheck(shopSeq);
        return ResponseEntity.ok(check);
    }
}
