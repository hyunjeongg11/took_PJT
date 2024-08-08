package com.took.fcm_api.dto;

import lombok.Getter;

@Getter
public class FCMRequest {

    private long userSeq;
    private long partySeq;
    private int category;
    private String title;
    private long receiveUserSeq;
    private int cost;
}
