package com.took.user_api.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.took.user_api.dto.request.party.makePartyRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


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
    private int category;

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

    @JsonManagedReference
    @OneToMany(mappedBy = "party", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<AlramEntity> alrams;

    public PartyEntity(String title, int category, int cost, int totalMember) {
        this.title = title;
        this.category = category;
        this.cost = cost;
        this.status = false;
        this.createdAt = LocalDateTime.now();
        this.totalMember = totalMember;

    }

    
}
