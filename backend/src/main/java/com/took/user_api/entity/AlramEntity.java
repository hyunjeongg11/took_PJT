package com.took.user_api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "alram")
@Table(name = "alram")
public class AlramEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alramSeq;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="user_seq")
    private UserEntity user;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="party_seq")
    private PartyEntity party;

    private int category;

    private LocalDateTime createAt;


}
