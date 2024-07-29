package com.took.user_api.dto.request.user;

import lombok.Getter;

@Getter
public class NearUserRequestDto {

    private Long userSeq;
    private double lat;
    private double lng;

}
