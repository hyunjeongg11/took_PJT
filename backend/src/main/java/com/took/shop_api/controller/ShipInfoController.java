package com.took.shop_api.controller;

import com.took.shop_api.dto.AddShipRequest;
import com.took.shop_api.dto.ShipResponse;
import com.took.shop_api.dto.UpdateShipRequest;
import com.took.shop_api.entity.ShipInfo;
import com.took.shop_api.service.ShipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ship")
public class ShipInfoController {

    private final ShipService shipService;

    @PostMapping("/create")
    public ResponseEntity<?> addShip(@RequestBody AddShipRequest request) {
        ShipInfo Ship = shipService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Ship);
    }

    @GetMapping("/select/{id}")
    public ResponseEntity<?> findShip(@PathVariable long id) {
        ShipInfo ship = shipService.findByShopSeq(id);

        return ResponseEntity.ok()
                .body(new ShipResponse(ship));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteShip(@PathVariable long id) {
        shipService.delete(id);

        return ResponseEntity.ok()
                .build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateShip(@PathVariable long id,
                                           @RequestBody UpdateShipRequest request) {
        ShipInfo Ship = shipService.update(id, request);

        return ResponseEntity.ok()
                .body(Ship);
    }
}
