package com.took.fcm_api.controller;

import com.took.fcm_api.dto.FCMRequest;
import com.took.fcm_api.service.FCMService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fcm")
@RequiredArgsConstructor
public class FCMController {

    private final FCMService fcmService;

    @PostMapping("/token")
    public String saveToken(@RequestParam long userSeq, @RequestParam String token) {
        fcmService.saveToken(userSeq, token);
        return "Token saved successfully";
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(@RequestBody FCMRequest request) {
        fcmService.sendNotification(request);
        return ResponseEntity.ok().build();
    }

}
