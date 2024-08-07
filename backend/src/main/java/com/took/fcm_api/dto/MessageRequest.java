package com.took.fcm_api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class MessageRequest {
    private String title;
    private String body;
    private Map<String, String> data;
    private List<Long> userSeqList;
}
