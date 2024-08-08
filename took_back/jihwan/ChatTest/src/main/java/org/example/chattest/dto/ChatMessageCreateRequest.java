package org.example.chattest.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatMessageCreateRequest {
    private String type;  // 메시지 타입 (ENTER, TALK, EXIT, MATCH, MATCH_REQUEST)
    private Long roomSeq;  // 채팅방 번호
    private Long userSeq;  // 메시지 송신자
    private String message;  // 메시지 내용
}
