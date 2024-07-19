package org.example.taxi_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaxiGuest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long guestSeq;

    @ManyToOne
    @JoinColumn(name = "taxi_seq", nullable = false)
    private Taxi taxi;

    @Column(nullable = false)
    private Long userSeq;

    @Column(nullable = false)
    private int cost;

    @Column(nullable = false)
    private String destiName;

    @Column(nullable = false)
    private double destiLat;

    @Column(nullable = false)
    private double destiLon;

    @Column(nullable = false)
    private int routeRank;
}
