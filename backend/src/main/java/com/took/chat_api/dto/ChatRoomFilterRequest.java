package com.took.chat_api.dto;

import lombok.Data;

import java.util.List;

@Data
public class ChatRoomFilterRequest {
    private int category;  // 카테고리
    private List<Long> userSeqs;  // 사용자 번호 목록
}