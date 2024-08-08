package org.example.taxi_api.dto;

import lombok.Data;

import java.util.List;

@Data
public class TaxiFinalCostResponse {

    private List<User> users;

    @Data
    public static class User {
        private Long userSeq;
        private int cost;
    }
}
