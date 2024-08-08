package com.housing.back.entity;

import java.time.LocalDateTime;


import com.housing.back.dto.request.party.PartyRequestDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity(name = "party")
@Table(name="party")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PartyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long partySeq;

    @Column(name = "title")
    private String title;

    @Column(name = "category")
    private String category;

    @Column(name = "cost")
    private int cost;

    @Column(name="status")
    private Boolean status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "count")
    private int count;

    @Column(name="total_member")
    private int totalMember;

    public PartyEntity(PartyRequestDto dto){

        this.title = dto.getTitle();
        this.category = dto.getCategory();
        this.cost = dto.getCost();
        this.totalMember = dto.getTotalMember();

        this.status = false;
        this.count = 0;
        this.createdAt = LocalDateTime.now();


    }
    
}
