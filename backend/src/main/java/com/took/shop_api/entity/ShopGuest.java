package com.took.shop_api.entity;

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
public class ShopGuest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shopGuestSeq;

    @Column(nullable = false)
    private Long userSeq;

    @Column(nullable = false)
    private Long shopSeq;

    @Column
    private boolean pickUp;

}
