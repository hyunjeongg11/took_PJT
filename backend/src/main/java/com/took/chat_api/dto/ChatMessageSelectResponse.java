package com.took.chat_api.dto;

import com.took.chat_api.entity.ChatMessage;
import lombok.Data;


import java.time.LocalDateTime;

@Data
public class ChatMessageSelectResponse {
    private String type;  // 메시지 타입 (ENTER, TALK, EXIT, MATCH, MATCH_REQUEST)
    private Long userSeq;  // 메시지 송신자 ID
    private String message;  // 메시지 내용
    private LocalDateTime createdAt;  // 메시지 생성 시간

    public ChatMessageSelectResponse(ChatMessage chatMessage) {
        this.type = String.valueOf(chatMessage.getType());
        this.userSeq = chatMessage.getUser().getUserSeq();
        this.message = chatMessage.getMessage();
        this.createdAt = chatMessage.getCreatedAt();
    }
}
