package com.housing.back.dto.response.party;

import com.housing.back.dto.response.ResponseDto;
import com.housing.back.entity.PartyEntity;

import lombok.Getter;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class PartyListResponseDto extends ResponseDto {

    private List<PartyEntity> list;
   
    private PartyListResponseDto(List<PartyEntity> list) {
        this.list = list;
    }

    public static ResponseEntity<PartyListResponseDto> success(List<PartyEntity> list) {
        PartyListResponseDto responseBody = new PartyListResponseDto(list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
