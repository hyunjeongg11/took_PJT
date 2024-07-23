package com.housing.back.entity;

import com.housing.back.dto.request.member.MemberSaveRequestDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @ManyToOne
    @JoinColumn(name = "party_seq")
    private PartyEntity party;

    @ManyToOne
    @JoinColumn(name="user_seq")
    private UserEntity user;


    public MemberEntity(MemberSaveRequestDto dto, PartyEntity party,UserEntity user){

        this.cost = dto.getCost();
        this.status = false;
        this.receive = dto.isReceive();
        this.isLeader = dto.isLeader();

        this.party = party;
        this.user = user;

    }



}
