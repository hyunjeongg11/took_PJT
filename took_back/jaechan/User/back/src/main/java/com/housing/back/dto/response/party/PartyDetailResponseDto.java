package com.housing.back.dto.response.party;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;
import com.housing.back.entity.MemberEntity;

import lombok.Getter;

@Getter
public class PartyDetailResponseDto extends ResponseDto{

    private List<MemberEntity> partyDetailList;
    
    private PartyDetailResponseDto(List<MemberEntity> partyDetailList){
        this.partyDetailList=partyDetailList;
    }

     public static ResponseEntity<PartyDetailResponseDto> success(List<MemberEntity> partyDetailList) {
        PartyDetailResponseDto responseBody = new PartyDetailResponseDto(partyDetailList);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    
}
