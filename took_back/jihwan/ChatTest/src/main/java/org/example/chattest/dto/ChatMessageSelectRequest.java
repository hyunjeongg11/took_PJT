package org.example.chattest.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatMessageSelectRequest {
    private Long roomSeq;
    private String userId;
}
