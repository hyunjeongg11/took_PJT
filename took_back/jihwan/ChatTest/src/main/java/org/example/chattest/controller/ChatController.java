package org.example.chattest.controller;

import lombok.RequiredArgsConstructor;
import org.example.chattest.dto.*;
import org.example.chattest.service.ChatRoomService;
import org.example.chattest.service.ChatUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.DestinationVariable;
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

    @PostMapping("/room")
    public ResponseEntity<ChatRoomCreateResponse> createRoom(@RequestBody ChatRoomCreateRequest chatRoomCreateRequest) {
        ChatRoomCreateResponse createdRoom = chatRoomService.createChatRoom(chatRoomCreateRequest);
        return ResponseEntity.ok(createdRoom);
    }

    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomSelectResponse>> getAllRooms() {
        List<ChatRoomSelectResponse> rooms = chatRoomService.findAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/room/{category}")
    public ResponseEntity<List<ChatRoomSelectResponse>> getRoom(@PathVariable int category) {
        List<ChatRoomSelectResponse> room = chatRoomService.findRoomsByCategory(category);
        return ResponseEntity.ok(room);
    }

    @MessageMapping("/room/enter")
    public void enterRoom(ChatUserCreateRequest chatUserCreateRequest) {
        ChatUserCreateResponse chatUser = chatUserService.enterChatRoom(chatUserCreateRequest);
        messagingTemplate.convertAndSend("/sub/chat/room/" + chatUser.getRoomSeq(), chatUser.getUserId() + "님이 입장하셨습니다.");
    }

    @MessageMapping("/room/leave")
    public void leaveRoom(ChatUserDeleteRequest chatUserDeleteRequest) {
        chatUserService.leaveChatRoom(chatUserDeleteRequest);
        messagingTemplate.convertAndSend("/sub/chat/room/" + chatUserDeleteRequest.getRoomSeq(), chatUserDeleteRequest.getUserId() + "님이 퇴장하셨습니다.");
    }

    @DeleteMapping("/room/{roomSeq}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long roomSeq) {
        chatRoomService.deleteChatRoom(roomSeq);
        messagingTemplate.convertAndSend("/sub/chat/rooms", roomSeq + " 채팅방이 삭제되었습니다.");  // 모든 유저에게 채팅방 삭제 알림
        return ResponseEntity.noContent().build();
    }
}