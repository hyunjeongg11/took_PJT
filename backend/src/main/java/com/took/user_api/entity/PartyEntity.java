package com.took.user_api.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


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
    private Long cost;

    @Column(name="status")
    private Boolean status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "count")
    private int count;

    @Column(name="total_member")
    private int totalMember;

    @Column(name="receive_cost")
    private Long receiveCost;

    @Column(name="delivery_tip")
    private Long deliveryTip;


    public void updateCost(Long cost){
        this.cost = cost;
    }

    public PartyEntity(String title, int category, Long cost, int totalMember, Long deliveryTip) {
        this.title = title;
        this.category = category;
        this.cost = cost;
        this.status = false;
        this.createdAt = LocalDateTime.now();
        this.totalMember = totalMember;
        this.receiveCost = 0L;
        this.deliveryTip = deliveryTip;
    }
}
