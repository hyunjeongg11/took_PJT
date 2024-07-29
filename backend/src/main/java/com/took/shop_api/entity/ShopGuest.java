package com.took.shop_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.took.user_api.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShopGuest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shopGuestSeq;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_seq", nullable = false)
    private UserEntity user;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "shop_seq", nullable = false)
    private Shop shop;

    @Column
    private boolean pickUp;

    public void updatePickUp(boolean pickUp) {
        this.pickUp = pickUp;
    }
}
