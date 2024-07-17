package org.example.chattest.dto;

import lombok.Data;

@Data
public class ChatRoomCreateRequest {
    private String roomTitle;  // 채팅방 제목
    private String userId; // 채팅방 작성자
    private int category; // 채팅방 카테고리
}
