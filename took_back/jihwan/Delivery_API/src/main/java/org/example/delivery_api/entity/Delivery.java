package org.example.delivery_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {

    public enum Status {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliverySeq;

    @Column(nullable = false)
    private Long userSeq;

    @Column(nullable = false)
    private String storeName;

    @Column(nullable = false)
    private String pickupPlace;

    @Column(nullable = false)
    private String rangeTip;

    @Column(nullable = false)
    private LocalDateTime deliveryTime;

    @Column(nullable = false)
    private String content;

    @Column
    private int deliveryTip;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime finishTime;
}
