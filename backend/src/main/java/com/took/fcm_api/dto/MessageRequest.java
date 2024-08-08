package com.took.fcm_api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class MessageRequest {
    private String title;
    private String body;
    private List<Long> userSeqList;

}
