package org.example.chattest.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatMessageCreateResponse {
    private Long messageSeq;  // 메시지 고유 번호
    private String type;  // 메시지 타입 (ENTER, TALK, EXIT, MATCH, MATCH_REQUEST)
    private Long roomSeq;  // 채팅방 번호
    private String userId;  // 메시지 송신자 ID
    private String message;  // 메시지 내용
    private LocalDateTime createdAt;  // 메시지 생성 시간
}
