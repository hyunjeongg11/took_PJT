package com.took.user_api.dto.response.party;


import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.entity.MemberEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class PartyDetailResponseDto extends ResponseDto {

    private List<MemberEntity> partyDetailList;
    
    private PartyDetailResponseDto(List<MemberEntity> partyDetailList){
        this.partyDetailList=partyDetailList;
    }

     public static ResponseEntity<PartyDetailResponseDto> success(List<MemberEntity> partyDetailList) {
        PartyDetailResponseDto responseBody = new PartyDetailResponseDto(partyDetailList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
}
