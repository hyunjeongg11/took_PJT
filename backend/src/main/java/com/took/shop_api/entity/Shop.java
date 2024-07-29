package com.took.shop_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.took.user_api.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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

    @Column(nullable = false)
    private Long roomSeq;

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

    @PrePersist
    protected void onCreate() {
        if (this.createAt == null) {
            this.createAt = LocalDateTime.now();
        }
        if (this.status == null) {
            this.status = statusType.OPEN;
        }
    }

    @Builder
    public Shop(String title, String content, int hit, String item, String site, String place, statusType status, LocalDateTime createAt) {
        this.title = title;
        this.content = content;
        this.hit = hit;
        this.item = item;
        this.site = site;
        this.place = place;
        this.status = status;
        this.createAt = createAt;
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
