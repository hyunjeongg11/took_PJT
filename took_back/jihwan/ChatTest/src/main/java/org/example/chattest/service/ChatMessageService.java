package org.example.chattest.service;

import lombok.RequiredArgsConstructor;
import org.example.chattest.dto.*;
import org.example.chattest.entity.ChatMessage;
import org.example.chattest.entity.ChatRoom;
import org.example.chattest.repository.ChatMessageRepository;
import org.example.chattest.repository.ChatRoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor  // Lombok 어노테이션으로, final 필드에 대해 생성자를 자동으로 생성
@Service  // 이 클래스가 서비스 역할을 한다는 것을 Spring에게 알려주는 어노테이션
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;

    /**
     * 메시지 저장
     * @param chatMessageCreateRequest 저장할 메시지 객체
     * @return 저장된 메시지 객체
     */
    @Transactional  // 트랜잭션 설정, 해당 메서드가 실행되는 동안 트랜잭션이 유지됨
    public ChatMessageCreateResponse saveMessage(ChatMessageCreateRequest chatMessageCreateRequest) {
        // 채팅방을 ID로 조회, 없을 경우 예외 발생
        ChatRoom chatRoom = chatRoomRepository.findById(chatMessageCreateRequest.getRoomSeq()).orElseThrow();
        // 현재 시간을 메시지의 생성 시간으로 설정
        ChatMessage chatMessage = ChatMessage.builder()
                .type(ChatMessage.MessageType.valueOf(chatMessageCreateRequest.getType()))
                .chatRoom(chatRoom)
                .userId(chatMessageCreateRequest.getUserId())
                .message(chatMessageCreateRequest.getMessage())
                .createdAt(LocalDateTime.now())
                .build();
        // 메시지 객체를 저장하고 반환
        ChatMessage savedChatMessage = chatMessageRepository.save(chatMessage);
        return new ChatMessageCreateResponse(savedChatMessage);
    }

    /**
     * 특정 채팅방의 모든 메시지 조회
     * @param roomSeq 조회할 채팅방의 고유 번호
     * @return 해당 채팅방의 모든 메시지 리스트
     */
    @Transactional(readOnly = true)  // 읽기 전용 트랜잭션 설정, 성능 향상
    public List<ChatMessageSelectResponse> findMessagesByRoomSeq(Long roomSeq) {
        // 특정 채팅방 ID의 모든 메시지를 조회하고 반환
        return chatMessageRepository.findByChatRoomRoomSeq(roomSeq).stream()
                .map(ChatMessageSelectResponse::new)
                .collect(Collectors.toList());
    }
}