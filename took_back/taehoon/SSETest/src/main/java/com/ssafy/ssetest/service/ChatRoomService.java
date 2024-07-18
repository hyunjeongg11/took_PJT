package com.ssafy.ssetest.service;

import com.ssafy.ssetest.entity.ChatRoom;
import com.ssafy.ssetest.entity.User;
import com.ssafy.ssetest.repository.ChatRoomRepository;
import com.ssafy.ssetest.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    public ChatRoomService(ChatRoomRepository chatRoomRepository, NotificationService notificationService, UserRepository userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }

    @Transactional
    public ChatRoom createChatRoom(String name, String creatorId, String recipientId) {
        User creator = userRepository.findById(creatorId).orElseThrow(() -> new IllegalArgumentException("유효하지 않은 사용자 ID: " + creatorId));
        User recipient = userRepository.findById(recipientId).orElseThrow(() -> new IllegalArgumentException("유효하지 않은 사용자 ID: " + recipientId));

        ChatRoom chatRoom = new ChatRoom(name, creator);
        chatRoom = chatRoomRepository.save(chatRoom);

        notificationService.sendNotification(recipientId, creatorId + " 님이 만든 채팅방이 생성되었습니다 ");

        return chatRoom;
    }
}
