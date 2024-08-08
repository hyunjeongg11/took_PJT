package com.housing.back.dto.response.party;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;


import lombok.Getter;

@Getter
public class PartyDoneResponseDto extends ResponseDto{

    private boolean status;

    private PartyDoneResponseDto(boolean status){
        this.status = status;
    }

    public static ResponseEntity<PartyDoneResponseDto> success(boolean status) {
        PartyDoneResponseDto responseBody = new PartyDoneResponseDto(status);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
}
