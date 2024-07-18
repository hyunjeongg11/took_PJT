package com.ssafy.shop_api.controller;

import com.ssafy.shop_api.dto.AddShopRequest;
import com.ssafy.shop_api.dto.ShopResponse;
import com.ssafy.shop_api.dto.UpdateShopRequest;
import com.ssafy.shop_api.entity.Shop;
import com.ssafy.shop_api.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/shops")
public class ShopController {

    private final ShopService shopService;

    @PostMapping("/crate")
    public ResponseEntity<Shop> addShop(@RequestBody AddShopRequest request) {
        Shop saveShop = shopService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(saveShop);
    }

    @GetMapping("/selectAll")
    public ResponseEntity<List<ShopResponse>> findAllShops() {
        List<ShopResponse> articles = shopService.findAll()
                .stream()
                .map(ShopResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(articles);
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
    public ResponseEntity<Shop> updateArticle(@PathVariable long id,
                                                 @RequestBody UpdateShopRequest request) {
        Shop updatedShop = shopService.update(id, request);

        return ResponseEntity.ok()
                .body(updatedShop);
    }
}
