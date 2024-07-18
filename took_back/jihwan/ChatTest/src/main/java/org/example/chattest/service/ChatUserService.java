package org.example.chattest.service;

import lombok.RequiredArgsConstructor;
import org.example.chattest.dto.ChatUserCreateRequest;
import org.example.chattest.dto.ChatUserCreateResponse;
import org.example.chattest.dto.ChatUserDeleteRequest;
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
     * 유저가 이미 채팅방에 존재하는지 확인하는 메서드
     * @param chatUserCreateRequest 유저의 방 입장 요청 정보를 담은 객체
     * @return 유저가 채팅방에 존재하지 않으면 true, 존재하면 false
     */
    @Transactional  // 트랜잭션 설정, 해당 메서드가 실행되는 동안 트랜잭션이 유지됨
    public boolean checkChatUser(ChatUserCreateRequest chatUserCreateRequest) {
        // 채팅방을 ID로 조회, 없을 경우 예외 발생
        ChatRoom chatRoom = chatRoomRepository.findById(chatUserCreateRequest.getRoomSeq()).orElseThrow();
        // 해당 유저의 채팅방 소속 여부를 확인
        ChatUser checkedChatUser = chatUserRepository.findByUserIdAndChatRoom(chatUserCreateRequest.getUserId(), chatRoom);
        // 유저가 존재하지 않으면 true 반환
        return checkedChatUser == null;
    }

    /**
     * 유저가 채팅방에 새로 참가할 때 처리하는 메서드
     * @param chatUserCreateRequest 유저의 방 입장 요청 정보를 담은 객체
     * @return 방에 입장한 유저의 정보
     */
    @Transactional  // 트랜잭션 설정, 해당 메서드가 실행되는 동안 트랜잭션이 유지됨
    public ChatUserCreateResponse enterChatRoom(ChatUserCreateRequest chatUserCreateRequest) {
        // 채팅방을 ID로 조회, 없을 경우 예외 발생
        ChatRoom chatRoom = chatRoomRepository.findById(chatUserCreateRequest.getRoomSeq()).orElseThrow();
        // 새로운 채팅 유저 객체 생성 및 설정
        ChatUser chatUser = ChatUser.builder()
                .chatRoom(chatRoom)
                .userId(chatUserCreateRequest.getUserId())
                .joinTime(LocalDateTime.now())
                .build();
        // 채팅 유저 객체를 저장하고 반환
        ChatUser savedChatUser = chatUserRepository.save(chatUser);
        return new ChatUserCreateResponse(savedChatUser);
    }

    /**
     * 유저가 채팅방에서 퇴장할 때 처리하는 메서드
     * @param chatUserDeleteRequest 유저의 방 퇴장 요청 정보를 담은 객체
     */
    @Transactional  // 트랜잭션 설정, 해당 메서드가 실행되는 동안 트랜잭션이 유지됨
    public void leaveChatRoom(ChatUserDeleteRequest chatUserDeleteRequest) {
        // 채팅방을 ID로 조회, 없을 경우 예외 발생
        ChatRoom chatRoom = chatRoomRepository.findById(chatUserDeleteRequest.getRoomSeq()).orElseThrow();
        // 채팅 유저 객체를 사용자 ID와 채팅방으로 조회
        ChatUser chatUser = chatUserRepository.findByUserIdAndChatRoom(chatUserDeleteRequest.getUserId(), chatRoom);
        // 조회된 채팅 유저 객체가 존재할 경우 삭제
        if (chatUser != null) {
            chatUserRepository.delete(chatUser);
        }
    }


    /**
     * 유저가 채팅방에서 강퇴당할때 처리하는 메서드
     * @param chatUserDeleteRequest 유저의 방 퇴장 요청 정보를 담은 객체
     */
    public void kickUserFromRoom(ChatUserDeleteRequest chatUserDeleteRequest) {
        // 채팅방을 ID로 조회, 없을 경우 예외 발생
        ChatRoom chatRoom = chatRoomRepository.findById(chatUserDeleteRequest.getRoomSeq()).orElseThrow();
        // 채팅 유저 객체를 사용자 ID와 채팅방으로 조회
        ChatUser chatUser = chatUserRepository.findByUserIdAndChatRoom(chatUserDeleteRequest.getUserId(), chatRoom);
        // 조회된 채팅 유저 객체가 존재할 경우 삭제
        if (chatUser != null) {
            chatUserRepository.delete(chatUser);
        }
    }
}
