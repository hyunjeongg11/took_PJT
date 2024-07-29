package com.took.chat_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.took.delivery_api.entity.Delivery;
import com.took.shop_api.entity.Shop;
import com.took.taxi_api.entity.Taxi;
import com.took.user_api.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity  // JPA 엔티티임을 나타내는 어노테이션
@Getter
@ToString
@NoArgsConstructor  // Lombok 어노테이션으로, 기본 생성자를 자동으로 생성
@AllArgsConstructor  // Lombok 어노테이션으로, 모든 필드를 매개변수로 받는 생성자를 자동으로 생성
@Builder
public class ChatRoom {

    @Id  // 기본 키(PK)로 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 자동 증가 설정
    private Long roomSeq;  // 채팅방 고유 번호

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_seq", nullable = false)  // 외래키(FK) 설정
    private UserEntity user;

    @Column(nullable = false)  // Not Null 설정
    private String roomTitle;  // 채팅방 제목

    @Column(nullable = false) // Not Null 설정
    private LocalDateTime createdAt; // 채팅방이 만들어진 시간

    @Column(nullable = false) // Not Null 설정
    private int category;

    @JsonManagedReference
    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)  // 일대다 관계 설정
    private List<ChatMessage> messages;  // 채팅방에 속한 메시지들

    @JsonManagedReference
    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY) // 일대다 관계 설정
    private List<ChatUser> users;  // 채팅방에 속한 사용자들

    @JsonManagedReference
    @OneToOne(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY) // 일대일 관계 설정
    private Delivery delivery;  // 채팅방에 속한 배달 정보

    @JsonManagedReference
    @OneToOne(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY) // 일대일 관계 설정
    private Taxi taxi;  // 채팅방에 속한 택시 정보

    @JsonManagedReference
    @OneToOne(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY) // 일대일 관계 설정
    private Shop shop;  // 채팅방에 속한 가게 정보
}
