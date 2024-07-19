package org.example.chattest.controller;

import lombok.RequiredArgsConstructor;
import org.example.chattest.dto.*;
import org.example.chattest.service.ChatMessageService;
import org.example.chattest.service.ChatRoomService;
import org.example.chattest.service.ChatUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor  // Lombok 어노테이션으로, final 필드에 대해 생성자를 자동으로 생성
@RestController  // 이 클래스가 RESTful 웹 서비스의 컨트롤러임을 나타내는 어노테이션
@RequestMapping("/api/chat")  // 이 클래스의 모든 핸들러 메서드의 기본 URL 경로를 설정
public class ChatController {

    private final ChatRoomService chatRoomService;
    private final ChatUserService chatUserService;
    private final ChatMessageService chatMessageService;
    private final SimpMessageSendingOperations messagingTemplate;

    /**
     * 새로운 채팅방을 생성하는 메서드
     * @param chatRoomCreateRequest 채팅방 생성 요청 정보를 담은 객체
     * @return 생성된 채팅방의 정보
     */
    @PostMapping("/room")
    public ResponseEntity<ChatRoomCreateResponse> createRoom(@RequestBody ChatRoomCreateRequest chatRoomCreateRequest) {
        ChatRoomCreateResponse createdRoom = chatRoomService.createChatRoom(chatRoomCreateRequest);
        // 모든 클라이언트에게 새로운 채팅방 정보 전송
        messagingTemplate.convertAndSend("/sub/chat/rooms", createdRoom);
        return ResponseEntity.ok(createdRoom);
    }

    /**
     * 모든 채팅방을 조회하는 메서드
     * @return 모든 채팅방의 정보 리스트
     */
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomCategorySelectResponse>> getAllRooms() {
        List<ChatRoomCategorySelectResponse> rooms = chatRoomService.findAllRooms();
        return ResponseEntity.ok(rooms);
    }

    /**
     * 특정 카테고리의 채팅방을 조회하는 메서드
     * @param category 조회할 카테고리
     * @return 해당 카테고리의 채팅방 정보 리스트
     */
    @GetMapping("/room/{category}")
    public ResponseEntity<List<ChatRoomCategorySelectResponse>> getRoom(@PathVariable int category) {
        List<ChatRoomCategorySelectResponse> room = chatRoomService.findRoomsByCategory(category);
        return ResponseEntity.ok(room);
    }

    /**
     * 특정 카테고리의 특정 사용자가 만든 채팅방을 조회하는 메서드
     * @param chatRoomFilterRequest 필터링할 카테고리와 사용자 번호 목록을 담은 객체
     * @return 필터링된 채팅방 리스트
     */
    @PostMapping("/rooms/filter")
    public ResponseEntity<List<ChatRoomFilterResponse>> filterRoomsByCategoryAndUsers(@RequestBody ChatRoomFilterRequest chatRoomFilterRequest) {
        List<ChatRoomFilterResponse> filteredRooms = chatRoomService.findRoomsByCategoryAndUsers(chatRoomFilterRequest);
        return ResponseEntity.ok(filteredRooms);
    }


    /**
     * 특정 채팅방의 속한 유저를 조회하는 메서드
     * @param roomSeq 조회할 채팅방
     * @return 해당 채팅방의 속한 유저 리스트
     */
    @GetMapping("/users/{roomSeq}")
    public ResponseEntity<List<ChatUserSelectResponse>> getRoom(@PathVariable Long roomSeq) {
        List<ChatUserSelectResponse> users = chatUserService.findUserByRoom(roomSeq);
        return ResponseEntity.ok(users);
    }

    /**
     * 유저가 채팅방에 입장할 때 처리하는 메서드
     * @param chatUserCreateRequest 유저의 방 입장 요청 정보를 담은 객체
     */
    @MessageMapping("/room/enter")
    public void enterRoom(ChatUserCreateRequest chatUserCreateRequest) {
        // 유저가 이미 채팅방에 존재하는지 확인
         if (chatUserService.checkChatUser(chatUserCreateRequest)) {
            joinRoom(chatUserCreateRequest);
        }
    }

    /**
     * 유저가 채팅방에 참가하는 로직을 처리하는 메서드
     * @param chatUserCreateRequest 유저의 방 입장 요청 정보를 담은 객체
     */
    public ResponseEntity<?> joinRoom(ChatUserCreateRequest chatUserCreateRequest) {
        chatUserService.enterChatRoom(chatUserCreateRequest);
        return ResponseEntity.noContent().build();
    }

    /**
     * 유저가 채팅방에서 퇴장할 때 처리하는 메서드
     * @param chatUserDeleteRequest 유저의 방 퇴장 요청 정보를 담은 객체
     */
    @MessageMapping("/room/leave")
    public ResponseEntity<?> leaveRoom(ChatUserDeleteRequest chatUserDeleteRequest) {
        chatUserService.leaveChatRoom(chatUserDeleteRequest);
        return ResponseEntity.noContent().build();
    }

    /**
     * 특정 멤버를 채팅방에서 내보내는 메서드
     * @param chatUserDeleteRequest 유저의 방 퇴장 요청 정보를 담은 객체
     * @return 응답 본문 없음
     */
    @MessageMapping("/room/kick")
    public ResponseEntity<?> kickUser(@RequestBody ChatUserDeleteRequest chatUserDeleteRequest) {
        chatUserService.kickUserFromRoom(chatUserDeleteRequest);
        return ResponseEntity.noContent().build();
    }

    /**
     * 채팅방을 삭제하는 메서드
     * @param roomSeq 삭제할 채팅방의 고유 번호
     * @return 응답 본문 없음
     */
    @DeleteMapping("/room/{roomSeq}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long roomSeq) {
        chatRoomService.deleteChatRoom(roomSeq);
        // 모든 클라이언트에게 채팅방 삭제 정보 전송
        messagingTemplate.convertAndSend("/sub/chat/rooms", roomSeq + " 채팅방이 삭제되었습니다.");
        return ResponseEntity.noContent().build();
    }

    /**
     * 메시지를 전송하는 메서드
     * @param chatMessageCreateRequest 메시지 생성 요청 정보를 담은 객체
     */
    @MessageMapping("/message/send")
    public void sendMessage(@RequestBody ChatMessageCreateRequest chatMessageCreateRequest) {
        ChatMessageCreateResponse savedMessage = chatMessageService.saveMessage(chatMessageCreateRequest);
        messagingTemplate.convertAndSend("/sub/chat/room/" + savedMessage.getRoomSeq(), savedMessage);
    }

    /**
     * 특정 채팅방의 모든 메시지를 조회하는 메서드
     * @param chatMessageSelectRequest 조회할 채팅방의 해당 유저의 참가시간과 메시지 생성 시간을 비교
     * @return 조회된 메시지 리스트
     */
    @PostMapping("/message/list")
    public ResponseEntity<List<ChatMessageSelectResponse>> getMessages(@RequestBody ChatMessageSelectRequest chatMessageSelectRequest) {
        List<ChatMessageSelectResponse> messages = chatMessageService.findMessagesByRoomSeq(chatMessageSelectRequest);
        return ResponseEntity.ok(messages);
    }
}
