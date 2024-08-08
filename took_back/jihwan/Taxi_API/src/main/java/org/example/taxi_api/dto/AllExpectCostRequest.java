package org.example.taxi_api.dto;

import lombok.Data;
import java.util.List;

@Data
public class AllExpectCostRequest {

    private List<Location> locations;
    private List<User> users;

    @Data
    public static class Location {
        private double lat;
        private double lon;

    }

    @Data
    public static class User {
        private Long userSeq;
        private int cost;
    }

}
