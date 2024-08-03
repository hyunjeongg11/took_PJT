package com.ssafy.fcmtest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fcm")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(@RequestBody NotificationRequest request) {
        notificationService.sendReminderNotification(request.getUserSeq(), request.getPartySeq(), request.getTitle(), request.getCost());
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/register")
//    public ResponseEntity<?> registerToken(@RequestBody TokenRequest request) {
//        notificationService.registerToken(request);
//        return ResponseEntity.ok().build();
//    }
}
