package org.example.chattest.controller;

import lombok.RequiredArgsConstructor;
import org.example.chattest.dto.ChatMessageCreateRequest;
import org.example.chattest.dto.ChatMessageCreateResponse;
import org.example.chattest.dto.ChatMessageSelectResponse;
import org.example.chattest.service.ChatMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor  // Lombok 어노테이션으로, final 필드에 대해 생성자를 자동으로 생성
@RestController  // 이 클래스가 RESTful 웹 서비스의 컨트롤러임을 나타내는 어노테이션
@RequestMapping("/api/chat/message")  // 이 클래스의 모든 핸들러 메서드의 기본 URL 경로를 설정
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final SimpMessageSendingOperations messagingTemplate;

    /**
     * 메시지 보내기
     * @param chatMessageCreateRequest 메시지 생성 요청 DTO
     */
    @MessageMapping("/send")  // WebSocket 메시지를 처리하기 위한 경로 설정
    public void sendMessage(@RequestBody ChatMessageCreateRequest chatMessageCreateRequest) {
        ChatMessageCreateResponse savedMessage = chatMessageService.saveMessage(chatMessageCreateRequest);
        messagingTemplate.convertAndSend("/sub/chat/room/" + savedMessage.getRoomSeq(), savedMessage);
    }

    /**
     * 특정 채팅방의 모든 메시지 조회
     * @param roomSeq 조회할 채팅방의 고유 번호
     * @return 조회된 메시지 리스트
     */
    @GetMapping("/room/{roomSeq}")  // HTTP GET 요청을 처리하기 위한 경로 설정
    public ResponseEntity<List<ChatMessageSelectResponse>> getMessages(@PathVariable Long roomSeq) {
        List<ChatMessageSelectResponse> messages = chatMessageService.findMessagesByRoomSeq(roomSeq);
        return ResponseEntity.ok(messages);
    }
}