package com.took.shop_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.took.chat_api.entity.ChatRoom;
import com.took.user_api.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shop {

    public void updateHit(int i) {
        this.hit += i;
    }

    public void updateStatus(statusType status) {
        this.status = status;
    }

    public void updateCount(int i) {
        this.count += i;
    }

    public enum statusType {
        OPEN, IN_PROGRESS, COMPLETED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shopSeq;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_seq", nullable = false)
    private UserEntity user;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "room_seq", nullable = false)
    private ChatRoom chatRoom;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = true)
    private int hit;

    @Column(nullable = false)
    private double lat;

    @Column(nullable = false)
    private double lon;

    @Column
    private int count;

    @Column(nullable = false)
    private String item;

    @Column(nullable = false)
    private String site;

    @Column(nullable = false)
    private String place;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private statusType status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createAt;

    @Column
    private int maxCount;

    @JsonManagedReference
    @OneToMany(mappedBy = "shop", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    List<ShopGuest> shopGuests;

    @JsonManagedReference
    @OneToMany(mappedBy = "shop", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ShipInfo> shipInfos;

    @JsonManagedReference
    @OneToMany(mappedBy = "shop", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<PurchaseInfo> purchaseInfos;

    @PrePersist
    protected void onCreate() {
        if (this.createAt == null) {
            this.createAt = LocalDateTime.now();
        }
        if (this.status == null) {
            this.status = statusType.OPEN;
        }
    }

    public void update(String title, String content, String item, String site, String place, int maxCount) {
        this.title = title;
        this.content = content;
        this.item = item;
        this.site = site;
        this.place = place;
        this.maxCount = maxCount;
    }
}
