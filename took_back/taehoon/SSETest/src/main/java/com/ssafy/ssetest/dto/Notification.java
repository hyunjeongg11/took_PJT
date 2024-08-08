package com.ssafy.ssetest.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class Notification {
    private String message;
    private List<Long> list;
}
