package org.example.chattest.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatUserSelectResponse {

    private Long userSeq;
}
