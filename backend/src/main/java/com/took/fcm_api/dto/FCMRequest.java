package com.took.fcm_api.dto;

import lombok.Getter;

@Getter
public class FCMRequest {
    private long userSeq;
    private long partySeq;
    private int category;
    private String title;
    private String token;
    private int cost;
}
