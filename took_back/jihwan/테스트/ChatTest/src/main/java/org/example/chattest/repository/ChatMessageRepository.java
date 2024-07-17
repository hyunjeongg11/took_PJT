package org.example.chattest.repository;

import org.example.chattest.entity.ChatMessage;
import org.example.chattest.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository  // 이 클래스가 리포지토리 역할을 한다는 것을 Spring에게 알려주는 어노테이션
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    // 특정 채팅방에 속한 모든 메시지를 조회하는 메서드
    List<ChatMessage> findByChatRoom(ChatRoom chatRoom);

    List<ChatMessage> findByChatRoomRoomSeq(Long roomSeq);
}
