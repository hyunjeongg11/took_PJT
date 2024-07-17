package org.example.chattest.controller;

import lombok.RequiredArgsConstructor;
import org.example.chattest.dto.ChatRoomCreateRequest;
import org.example.chattest.dto.ChatRoomCreateResponse;
import org.example.chattest.dto.ChatUserRequest;
import org.example.chattest.dto.ChatUserResponse;
import org.example.chattest.service.ChatRoomService;
import org.example.chattest.service.ChatUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatRoomService chatRoomService;
    private final ChatUserService chatUserService;
    private final SimpMessageSendingOperations messagingTemplate;

    // 채팅방 생성
    @PostMapping("/room")
    public ResponseEntity<ChatRoomCreateResponse> createRoom(@RequestBody ChatRoomCreateRequest chatRoomCreateRequest) {
        ChatRoomCreateResponse createdRoom = chatRoomService.createChatRoom(chatRoomCreateRequest);
        messagingTemplate.convertAndSend("/sub/chat/rooms", createdRoom);  // 모든 유저에게 새 채팅방 알림
        return ResponseEntity.ok(createdRoom);
    }

    // 모든 채팅방 조회
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomCreateResponse>> getAllRooms() {
        List<ChatRoomCreateResponse> rooms = chatRoomService.findAllRooms();
        return ResponseEntity.ok(rooms);
    }

    // 특정 채팅방 조회
    @GetMapping("/room/{roomSeq}")
    public ResponseEntity<List<ChatRoomCreateResponse>> getRoom(@PathVariable int category) {
        List<ChatRoomCreateResponse> room = chatRoomService.findRoomByCategory(category);
        return ResponseEntity.ok(room);
    }

    // 채팅방 입장
    @MessageMapping("/room/enter")
    public void enterRoom(@RequestBody ChatUserRequest chatUserRequest) {
        ChatUserResponse chatUser = chatUserService.enterChatRoom(chatUserRequest);
        messagingTemplate.convertAndSend("/sub/chat/room/" + chatUserRequest.getRoomSeq(), chatUserRequest.getUserId() + "님이 입장하셨습니다.");
    }

    // 채팅방 퇴장
    @MessageMapping("/room/leave")
    public void leaveRoom(@RequestBody ChatUserRequest chatUserRequest) {
        chatUserService.leaveChatRoom(chatUserRequest);
        messagingTemplate.convertAndSend("/sub/chat/room/" + chatUserRequest.getRoomSeq(), chatUserRequest.getUserId() + "님이 퇴장하셨습니다.");
    }
}
