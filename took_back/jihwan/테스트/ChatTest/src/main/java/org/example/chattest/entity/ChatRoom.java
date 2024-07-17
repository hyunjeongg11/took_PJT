package org.example.chattest.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity  // JPA 엔티티임을 나타내는 어노테이션
@Data  // Lombok 어노테이션으로, getter, setter, toString, equals, hashCode 메서드를 자동으로 생성
@NoArgsConstructor  // Lombok 어노테이션으로, 기본 생성자를 자동으로 생성
@AllArgsConstructor  // Lombok 어노테이션으로, 모든 필드를 매개변수로 받는 생성자를 자동으로 생성
@Builder
public class ChatRoom {

    @Id  // 기본 키(PK)로 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 자동 증가 설정
    private Long roomSeq;  // 채팅방 고유 번호

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)  // Not Null 설정
    private String roomTitle;  // 채팅방 제목

    @Column(nullable = false) // Not Null 설정
    private LocalDateTime createdAt; // 채팅방이 만들어진 시간

    @Column(nullable = false) // Not Null 설정
    private int category;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true)  // 일대다 관계 설정
    private List<ChatMessage> messages;  // 채팅방에 속한 메시지들

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true)  // 일대다 관계 설정
    private List<ChatUser> users;  // 채팅방에 속한 사용자들
}
