package org.example.chattest.dto;

import lombok.Data;
import org.example.chattest.entity.ChatRoom;

import java.time.LocalDateTime;

@Data
public class ChatRoomCategorySelectResponse {
    private Long roomSeq;  // 채팅방 고유 번호
    private String roomTitle;  // 채팅방 제목
    private Long userSeq; // 채팅방 작성자
    private LocalDateTime createdAt; // 채팅방 만들어진 시간
    private int category; // 채팅방 카테고리

    public ChatRoomCategorySelectResponse(ChatRoom chatRoom) {
        this.roomSeq = chatRoom.getRoomSeq();
        this.roomTitle = chatRoom.getRoomTitle();
        this.userSeq = chatRoom.getUserSeq();
        this.createdAt = chatRoom.getCreatedAt();
        this.category = chatRoom.getCategory();
    }
}