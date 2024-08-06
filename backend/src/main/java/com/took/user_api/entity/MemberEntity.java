package com.took.user_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import com.took.user_api.dto.request.member.MemberSaveRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "member")
@Table(name="member")
public class MemberEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberSeq;


    @Column(name="cost")
    private int cost;

    @Column(name="status")
    private boolean status;

    @Column(name = "receive")
    private boolean receive;

    @Column(name="is_leader")
    private boolean isLeader;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "party_seq")
    private PartyEntity party;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="user_seq")
    private UserEntity user;

    @Column(name = "created_at", nullable = true)
    private LocalDateTime createdAt;



    public MemberEntity(PartyEntity party,UserEntity user,int cost,Boolean status,Boolean receive){
     this.party = party;
     this.status = status;
     this.cost = cost;
     this.receive = receive;
     this.isLeader = true;
     this.createdAt = LocalDateTime.now();
     this.user = user;

    }

    public MemberEntity(PartyEntity party,UserEntity user){
        this.party = party;
        this.status = false;
        this.cost = 0;
        this.receive = false;
        this.isLeader = false;
        this.createdAt = LocalDateTime.now();
        this.user = user;

    }



}
