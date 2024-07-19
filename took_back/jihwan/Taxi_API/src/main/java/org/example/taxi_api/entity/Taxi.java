package org.example.taxi_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Taxi {

    public enum Status {
        OPEN, FILLED, BOARD, DONE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long taxiSeq;

    @Column(nullable = false)
    private Long roomSeq;

    @Column(nullable = false)
    private Long userSeq;

    @Column
    private double startLat;

    @Column
    private double startLon;

    @Column(nullable = false)
    private boolean gender;

    @Column(nullable = false)
    private int count;

    @Column(nullable = false)
    private int max;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime finishTime;

    @Column
    private int cost;

    @Column(nullable = false)
    private Long master;

    @OneToMany(mappedBy = "taxi", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TaxiGuest> taxiGuests;
}
