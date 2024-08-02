package com.ssafy.fcmtest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/sendNotification")
    public void sendNotification(@RequestBody NotificationRequest request) {
        notificationService.sendNotification(request.getToken(), request.getTitle(), request.getBody());
    }
}
