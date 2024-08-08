package org.example.taxi_api.dto;

import lombok.Data;

import java.util.List;

@Data
public class AllExpectCostResponse {

    private int allCost;

    private double distance;

    private int duration;

    private List<User> users;

    @Data
    public static class User {
        private Long userSeq;
        private int cost;
    }
}
