package org.example.chattest.service;

import lombok.RequiredArgsConstructor;
import org.example.chattest.dto.ChatUserRequest;
import org.example.chattest.dto.ChatUserResponse;
import org.example.chattest.entity.ChatRoom;
import org.example.chattest.entity.ChatUser;
import org.example.chattest.repository.ChatRoomRepository;
import org.example.chattest.repository.ChatUserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@RequiredArgsConstructor  // Lombok 어노테이션으로, final 필드에 대해 생성자를 자동으로 생성
@Service  // 이 클래스가 서비스 역할을 한다는 것을 Spring에게 알려주는 어노테이션
public class ChatUserService {

    private final ChatUserRepository chatUserRepository;
    private final ChatRoomRepository chatRoomRepository;

    /**
     * 채팅방 입장
     * @param chatUserRequest 채팅방 입장 요청 DTO
     * @return 채팅방에 입장한 유저의 응답 DTO
     */
    @Transactional  // 트랜잭션 설정, 해당 메서드가 실행되는 동안 트랜잭션이 유지됨
    public ChatUserResponse enterChatRoom(ChatUserRequest chatUserRequest) {
        // 채팅방을 ID로 조회, 없을 경우 예외 발생
        ChatRoom chatRoom = chatRoomRepository.findById(chatUserRequest.getRoomSeq()).orElseThrow();
        // 새로운 채팅 유저 객체 생성 및 설정
        ChatUser chatUser = ChatUser.builder()
                .chatRoom(chatRoom)
                .userId(chatUserRequest.getUserId())
                .joinTime(LocalDateTime.now())
                .build();
        // 채팅 유저 객체를 저장하고 반환
        ChatUser savedChatUser = chatUserRepository.save(chatUser);
        return new ChatUserResponse(savedChatUser);
    }

    /**
     * 채팅방 퇴장
     * @param chatUserRequest 채팅방 퇴장 요청 DTO
     */
    @Transactional  // 트랜잭션 설정, 해당 메서드가 실행되는 동안 트랜잭션이 유지됨
    public void leaveChatRoom(ChatUserRequest chatUserRequest) {
        // 채팅방을 ID로 조회, 없을 경우 예외 발생
        ChatRoom chatRoom = chatRoomRepository.findById(chatUserRequest.getRoomSeq()).orElseThrow();
        // 채팅 유저 객체를 사용자 ID와 채팅방으로 조회
        ChatUser chatUser = chatUserRepository.findByUserIdAndChatRoom(chatUserRequest.getUserId(), chatRoom);
        // 조회된 채팅 유저 객체가 존재할 경우 삭제
        if (chatUser != null) {
            chatUserRepository.delete(chatUser);
        }
    }
}
