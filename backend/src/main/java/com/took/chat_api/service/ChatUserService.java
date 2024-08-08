package com.took.chat_api.service;

import com.took.chat_api.dto.*;
import com.took.chat_api.entity.ChatRoom;
import com.took.chat_api.entity.ChatUser;
import com.took.chat_api.repository.ChatRoomRepository;
import com.took.chat_api.repository.ChatUserRepository;
import com.took.user_api.entity.UserEntity;
import com.took.user_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RequiredArgsConstructor  // Lombok 어노테이션으로, final 필드에 대해 생성자를 자동으로 생성
@Service  // 이 클래스가 서비스 역할을 한다는 것을 Spring에게 알려주는 어노테이션
public class ChatUserService {

    private final ChatUserRepository chatUserRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    /**
     * 유저가 이미 채팅방에 존재하는지 확인하는 메서드
     * @param chatUserCreateRequest 유저의 방 입장 요청 정보를 담은 객체
     * @return 유저가 채팅방에 존재하지 않으면 true, 존재하면 false
     */
    @Transactional  // 트랜잭션 설정, 해당 메서드가 실행되는 동안 트랜잭션이 유지됨
    public boolean checkChatUser(ChatUserCreateRequest chatUserCreateRequest) {
        UserEntity user = userRepository.findById(chatUserCreateRequest.getUserSeq()).orElseThrow();
        // 채팅방을 ID로 조회, 없을 경우 예외 발생
        ChatRoom chatRoom = chatRoomRepository.findById(chatUserCreateRequest.getRoomSeq()).orElseThrow();
        // 해당 유저의 채팅방 소속 여부를 확인
        ChatUser checkedChatUser = chatUserRepository.findByUserAndChatRoom(user, chatRoom);
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
        UserEntity user = userRepository.findById(chatUserCreateRequest.getUserSeq()).orElseThrow();
        // 새로운 채팅 유저 객체 생성 및 설정
        ChatUser chatUser = ChatUser.builder()
                .chatRoom(chatRoom)
                .user(user)
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
        UserEntity user = userRepository.findById(chatUserDeleteRequest.getUserSeq()).orElseThrow();
        // 채팅방을 ID로 조회, 없을 경우 예외 발생
        ChatRoom chatRoom = chatRoomRepository.findById(chatUserDeleteRequest.getRoomSeq()).orElseThrow();
        // 채팅 유저 객체를 사용자 ID와 채팅방으로 조회
        ChatUser chatUser = chatUserRepository.findByUserAndChatRoom(user, chatRoom);
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
        UserEntity user = userRepository.findById(chatUserDeleteRequest.getUserSeq()).orElseThrow();
        // 채팅방을 ID로 조회, 없을 경우 예외 발생
        ChatRoom chatRoom = chatRoomRepository.findById(chatUserDeleteRequest.getRoomSeq()).orElseThrow();
        // 채팅 유저 객체를 사용자 ID와 채팅방으로 조회
        ChatUser chatUser = chatUserRepository.findByUserAndChatRoom(user, chatRoom);
        // 조회된 채팅 유저 객체가 존재할 경우 삭제
        if (chatUser != null) {
            chatUserRepository.delete(chatUser);
        }
    }

    /**
     * 채팅방의 유저리스트를 조회하는 메서드
     * @param roomSeq 채팅방 번호
     */
    public List<ChatUserSelectResponse> findUserByRoom(Long roomSeq) {
        // 채팅방을 ID로 조회, 없을 경우 예외 발생
        ChatRoom chatRoom = chatRoomRepository.findById(roomSeq).orElseThrow();

        List<ChatUser> users = chatUserRepository.findByChatRoom(chatRoom);

        List<UserEntity> userInfos = userRepository.findByUserSeqIn(users.stream()
                .map(user -> user.getUser().getUserSeq())
                .collect(Collectors.toList()));

        // userInfos를 userSeq를 기준으로 매핑
        Map<Long, UserEntity> userInfoMap = userInfos.stream()
                .collect(Collectors.toMap(UserEntity::getUserSeq, Function.identity()));

        // ChatUser 리스트를 ChatUserSelectResponse 리스트로 변환
        return users.stream()
                .map(user -> {
                    UserEntity userEntity = userInfoMap.get(user.getUser().getUserSeq());
                    return ChatUserSelectResponse.builder()
                            .userSeq(user.getUser().getUserSeq())
                            .userName(userEntity != null ? userEntity.getUserName() : null)
                            .imageNo(userEntity != null ? userEntity.getImageNo() : null)
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public List<ChatRoomCategorySelectResponse> findRoomsByUser(Long userSeq) {
        // 주어진 userSeq로 UserEntity 조회
        UserEntity user = userRepository.findById(userSeq).orElseThrow();

        // 해당 유저가 참여하고 있는 ChatUser 목록 조회
        List<ChatUser> chatUsers = chatUserRepository.findByUser(user);

        // ChatUser에서 ChatRoom을 추출하고 중복을 제거하여 리스트로 변환
        List<ChatRoom> chatRooms = chatUsers.stream()
                .map(ChatUser::getChatRoom)
                .distinct()
                .toList();

        // ChatRoom을 ChatRoomCategorySelectResponse로 변환
        return chatRooms.stream()
                .map(ChatRoomCategorySelectResponse::new)  // DTO 변환
                .collect(Collectors.toList());
    }
}
