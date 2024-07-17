package org.example.chattest.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity  // JPA 엔티티임을 나타내는 어노테이션
@Data  // Lombok 어노테이션으로, getter, setter, toString, equals, hashCode 메서드를 자동으로 생성
@NoArgsConstructor  // Lombok 어노테이션으로, 기본 생성자를 자동으로 생성
@AllArgsConstructor  // Lombok 어노테이션으로, 모든 필드를 매개변수로 받는 생성자를 자동으로 생성
@Builder
public class ChatUser {

    @Id  // 기본 키(PK)로 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 자동 증가 설정
    private Long userSeq;  // 유저 고유 번호

    @ManyToOne  // 다대일 관계 설정
    @JoinColumn(name = "room_seq", nullable = false)  // 외래 키 설정 및 Not Null 설정
    private ChatRoom chatRoom;  // 유저가 속한 채팅방

    @Column(nullable = false)  // Not Null 설정
    private LocalDateTime joinTime;  // 방에 들어간 시간

    @Column(nullable = false)  // Not Null 설정
    private String userId;  // 유저 이름
}
