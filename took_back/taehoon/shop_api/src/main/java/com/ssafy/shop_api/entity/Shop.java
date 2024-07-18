package com.ssafy.shop_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shop {

    public enum statusType {
        OPEN, IN_PROGRESS, COMPLETED
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shopSeq;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int hit;

    @Column(nullable = false)
    private String item;

    @Column(nullable = false)
    private String site;

    @Column(nullable = false)
    private String place;

    @Enumerated(EnumType.STRING)
    private statusType status;

    @Builder
    public Shop(String title, String content, int hit, String item, String site, String place, statusType status) {
        this.title = title;
        this.content = content;
        this.hit = hit;
        this.item = item;
        this.site = site;
        this.place = place;
        this.status = status;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
