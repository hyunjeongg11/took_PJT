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
    @JoinColumn(name = "userSeq", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private Long shopSeq;

    @Column
    private boolean pickUp;

}
