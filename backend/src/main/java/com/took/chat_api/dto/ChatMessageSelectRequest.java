package com.took.chat_api.dto;

import lombok.Data;

@Data
public class ChatMessageSelectRequest {
    private Long roomSeq;
    private Long userSeq;
}
