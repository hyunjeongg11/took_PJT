package com.took.user_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Builder
public class MemberEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberSeq;

    @Column(name="cost")
    private Long cost;

    @Column(name="status")
    private boolean status;

    @Column(name = "receive")
    private boolean receive;

    @Column(name="leader")
    private boolean leader;

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

    @Column(name = "fake_cost")
    private Long fakeCost;

    public MemberEntity(PartyEntity party,UserEntity user,Long cost,Boolean status,Boolean receive){
     this.party = party;
     this.status = status;
     this.cost = cost;
     this.receive = receive;
     this.leader = true;
     this.createdAt = LocalDateTime.now();
     this.user = user;
    }

    public MemberEntity(PartyEntity party,UserEntity user){
        this.party = party;
        this.status = false;
        this.cost = 0L;
        this.receive = false;
        this.leader = false;
        this.createdAt = LocalDateTime.now();
        this.user = user;
    }

    public MemberEntity(PartyEntity party,UserEntity user,Long cost){
        this.party = party;
        this.status = false;
        this.cost = cost;
        this.receive = false;
        this.leader = false;
        this.createdAt = LocalDateTime.now();
        this.user = user;
    }

    public void updateCost(Long cost) {
        this.cost = cost;
    }
}
