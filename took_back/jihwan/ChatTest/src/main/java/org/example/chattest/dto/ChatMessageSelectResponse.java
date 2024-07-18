package org.example.chattest.dto;

import lombok.Data;
import org.example.chattest.entity.ChatMessage;

import java.time.LocalDateTime;

@Data
public class ChatMessageSelectResponse {
    private String type;  // 메시지 타입 (ENTER, TALK, EXIT, MATCH, MATCH_REQUEST)
    private String userId;  // 메시지 송신자 ID
    private String message;  // 메시지 내용
    private LocalDateTime createdAt;  // 메시지 생성 시간

    public ChatMessageSelectResponse(ChatMessage chatMessage) {
        this.type = String.valueOf(chatMessage.getType());
        this.userId = chatMessage.getUserId();
        this.message = chatMessage.getMessage();
        this.createdAt = chatMessage.getCreatedAt();
    }
}
