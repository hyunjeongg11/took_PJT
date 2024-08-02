package com.ssafy.fcmtest;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class NotificationRequest {
    private String token;
    private String title;
    private String body;
}
