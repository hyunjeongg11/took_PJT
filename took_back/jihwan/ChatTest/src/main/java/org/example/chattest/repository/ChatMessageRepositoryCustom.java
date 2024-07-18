package org.example.chattest.repository;

import org.example.chattest.entity.ChatMessage;

import java.util.List;

public interface ChatMessageRepositoryCustom {
    List<ChatMessage> findMessagesByRoomSeqAndUserJoinTime(Long roomSeq, String userId);
}
