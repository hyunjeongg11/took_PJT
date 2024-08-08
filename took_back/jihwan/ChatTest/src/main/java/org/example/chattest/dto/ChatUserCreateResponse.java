package org.example.chattest.dto;

import lombok.Data;
import org.example.chattest.entity.ChatUser;

import java.time.LocalDateTime;

@Data
public class ChatUserCreateResponse {
    private Long chatUserSeq;  // 유저 고유 번호
    private Long roomSeq;  // 채팅방 번호
    private Long userSeq;  // 유저 ID
    private LocalDateTime joinTime;  // 방에 들어간 시간

    public ChatUserCreateResponse(ChatUser chatUser) {
        this.chatUserSeq = chatUser.getChatUserSeq();
        this.roomSeq = chatUser.getChatRoom().getRoomSeq();
        this.userSeq = chatUser.getUserSeq();
        this.joinTime = chatUser.getJoinTime();
    }
}
