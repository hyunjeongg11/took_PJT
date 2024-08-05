package com.took.fcm_api.controller;

import com.took.fcm_api.dto.FCMRequest;
import com.took.fcm_api.service.FCMService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fcm")
@RequiredArgsConstructor
public class FCMController {

    private final FCMService fcmService;

    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(@RequestBody FCMRequest request) {
        fcmService.sendNotification(request.getUserSeq(), request.getPartySeq(), request.getCategory(),request.getTitle(), request.getToken(), request.getCost());
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/register")
//    public ResponseEntity<?> registerToken(@RequestBody TokenRequest request) {
//        notificationService.registerToken(request);
//        return ResponseEntity.ok().build();
//    }
}
