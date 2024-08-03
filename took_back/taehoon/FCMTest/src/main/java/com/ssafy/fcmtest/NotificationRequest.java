package com.ssafy.fcmtest;

import lombok.Getter;
import lombok.Setter;

@Getter
public class NotificationRequest {
    private long userSeq;
    private long partySeq;
    private String title;
    private String token;
    private int cost;

}
