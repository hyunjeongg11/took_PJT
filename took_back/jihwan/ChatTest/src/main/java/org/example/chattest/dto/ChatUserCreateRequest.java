package org.example.chattest.dto;

import lombok.Data;

@Data
public class ChatUserCreateRequest {
    private Long roomSeq;  // 채팅방 번호
    private String userId;  // 유저 ID
}
