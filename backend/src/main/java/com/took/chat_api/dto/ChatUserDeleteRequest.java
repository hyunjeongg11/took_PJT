package com.took.chat_api.dto;

import lombok.Data;

@Data
public class ChatUserDeleteRequest {
    private Long roomSeq;  // 채팅방 번호
    private Long userSeq;  // 유저 ID
}
