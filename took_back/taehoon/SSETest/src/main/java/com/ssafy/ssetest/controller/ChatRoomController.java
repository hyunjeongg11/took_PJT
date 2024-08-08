package com.ssafy.ssetest.controller;

import com.ssafy.ssetest.entity.ChatRoom;
import com.ssafy.ssetest.service.ChatRoomService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chatrooms")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    public ChatRoomController(ChatRoomService chatRoomService) {
        this.chatRoomService = chatRoomService;
    }

    @PostMapping
    public ChatRoom createChatRoom(@RequestParam String name, @RequestParam String creatorId, @RequestParam String recipientId) {
        return chatRoomService.createChatRoom(name, creatorId, recipientId);
    }
}
