package com.ssafy.ssetest.controller;

import com.ssafy.ssetest.dto.Notification;
import com.ssafy.ssetest.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/noti")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    
    // 알림 설정
    @GetMapping("/subscribe/{userSeq}")
    public SseEmitter subscribe(@PathVariable Long userSeq) {

        return notificationService.subscribe(userSeq);
    }

    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody Notification notification){
        notificationService.sendNotification(notification);
        return ResponseEntity.ok().build();
    }
}
