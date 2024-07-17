package org.example.chattest.service;

import lombok.RequiredArgsConstructor;
import org.example.chattest.dto.ChatRoomCreateRequest;
import org.example.chattest.dto.ChatRoomCreateResponse;
import org.example.chattest.dto.ChatRoomSelectResponse;
import org.example.chattest.entity.ChatRoom;
import org.example.chattest.repository.ChatRoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor  // Lombok 어노테이션으로, final 필드에 대해 생성자를 자동으로 생성
@Service  // 이 클래스가 서비스 역할을 한다는 것을 Spring에게 알려주는 어노테이션
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    /**
     * 채팅방 생성
     * @param chatRoomCreateRequest 채팅방 생성 요청 DTO
     * @return 생성된 채팅방의 응답 DTO
     */
    @Transactional  // 트랜잭션 설정, 해당 메서드가 실행되는 동안 트랜잭션이 유지됨
    public ChatRoomCreateResponse createChatRoom(ChatRoomCreateRequest chatRoomCreateRequest) {
        ChatRoom chatRoom = ChatRoom.builder()
                .roomTitle(chatRoomCreateRequest.getRoomTitle())
                .userId(chatRoomCreateRequest.getUserId())
                .createdAt(LocalDateTime.now())
                .build();
        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);  // 채팅방을 저장
        return new ChatRoomCreateResponse(savedChatRoom);  // ChatRoomCreateResponse로 변환하여 반환
    }

    /**
     * 모든 채팅방 조회
     * @return 모든 채팅방 리스트
     */
    @Transactional(readOnly = true)  // 읽기 전용 트랜잭션 설정, 성능 향상
    public List<ChatRoomSelectResponse> findAllRooms() {
        return chatRoomRepository.findAll().stream()
                .map(ChatRoomSelectResponse::new)  // ChatRoom 엔티티를 ChatRoomCreateResponse로 변환
                .collect(Collectors.toList());  // 리스트로 변환하여 반환
    }

    /**
     * 카테고리로 채팅방 조회
     * @param category 조회할 카테고리
     * @return 조회된 채팅방 리스트
     */
    @Transactional(readOnly = true)  // 읽기 전용 트랜잭션 설정, 성능 향상
    public List<ChatRoomSelectResponse> findRoomsByCategory(int category) {
        return chatRoomRepository.findByCategory(category).stream()
                .map(ChatRoomSelectResponse::new)  // ChatRoom 엔티티를 ChatRoomCreateResponse로 변환
                .collect(Collectors.toList());  // 리스트로 변환하여 반환
    }

    /**
     * 특정 채팅방 삭제
     * @param roomSeq 삭제할 채팅방의 고유 번호
     */
    @Transactional  // 트랜잭션 설정, 해당 메서드가 실행되는 동안 트랜잭션이 유지됨
    public void deleteChatRoom(Long roomSeq) {
        chatRoomRepository.deleteById(roomSeq);  // 채팅방 삭제
    }
}
