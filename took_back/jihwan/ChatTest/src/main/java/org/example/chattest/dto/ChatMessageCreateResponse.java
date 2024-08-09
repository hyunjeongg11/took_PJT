package org.example.chattest.dto;

import lombok.Data;
import org.example.chattest.entity.ChatMessage;
import org.example.chattest.entity.ChatRoom;

import java.time.LocalDateTime;

@Data
public class ChatMessageCreateResponse {
    private Long roomSeq;
    private String type;  // 메시지 타입 (ENTER, TALK, EXIT, MATCH, MATCH_REQUEST)
    private Long userSeq;  // 메시지 송신자 ID
    private String message;  // 메시지 내용
    private LocalDateTime createdAt;  // 메시지 생성 시간

    public ChatMessageCreateResponse(ChatMessage chatMessage) {
        this.roomSeq = chatMessage.getChatRoom().getRoomSeq();
        this.type = String.valueOf(chatMessage.getType());
        this.userSeq = chatMessage.getUserSeq();
        this.message = chatMessage.getMessage();
        this.createdAt = chatMessage.getCreatedAt();
    }
}
