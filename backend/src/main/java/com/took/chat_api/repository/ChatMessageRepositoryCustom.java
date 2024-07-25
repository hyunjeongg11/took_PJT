package com.took.chat_api.repository;



import com.took.chat_api.entity.ChatMessage;

import java.util.List;

public interface ChatMessageRepositoryCustom {
    List<ChatMessage> findMessagesByRoomSeqAndUserJoinTime(Long roomSeq, Long UserSeq);
}
