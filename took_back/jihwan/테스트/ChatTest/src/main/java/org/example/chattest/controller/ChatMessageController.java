package org.example.chattest.controller;

import lombok.RequiredArgsConstructor;
import org.example.chattest.entity.ChatMessage;
import org.example.chattest.service.ChatMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat/message")
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final SimpMessageSendingOperations messagingTemplate;

    // 메시지 보내기
    @MessageMapping("/send")
    public void sendMessage(ChatMessage message) {
        ChatMessage savedMessage = chatMessageService.saveMessage(message);
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getChatRoom().getRoomSeq(), savedMessage);
    }

    // 특정 채팅방의 모든 메시지 조회
    @GetMapping("/room/{roomSeq}")
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable Long roomSeq) {
        List<ChatMessage> messages = chatMessageService.findMessagesByRoomSeq(roomSeq);
        return ResponseEntity.ok(messages);
    }
}
