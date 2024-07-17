package org.example.chattest.dto;

import lombok.Data;

@Data
public class ChatMessageCreateRequest {
    private String type;  // 메시지 타입 (ENTER, TALK, EXIT, MATCH, MATCH_REQUEST)
    private Long roomSeq;  // 채팅방 번호
    private String userId;  // 메시지 송신자
    private String message;  // 메시지 내용
}
