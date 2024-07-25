package com.took.taxi_api.dto;

import lombok.Data;

import java.util.List;

@Data
public class TaxiFInalCostRequest {

    private Long taxiSeq;

    private int allCost;

    private List<User> users;

    @Data
    public static class User {
        private Long userSeq;
        private int cost;
    }
}
