package com.took.fcm_api.controller;

import com.took.fcm_api.dto.FCMTokenRequest;
import com.took.fcm_api.dto.MessageRequest;
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
    public String saveToken(@RequestBody FCMTokenRequest request) {
        fcmService.saveToken(request);
        return "Token saved successfully";
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody MessageRequest request) {
        fcmService.sendMessage(request);
        return ResponseEntity.ok().build();
    }
}
