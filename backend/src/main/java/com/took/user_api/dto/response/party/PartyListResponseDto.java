package com.took.user_api.dto.response.party;


import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.entity.PartyEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

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
