package com.housing.back.service;

import org.springframework.http.ResponseEntity;

import com.housing.back.dto.request.party.PartyRequestDto;
import com.housing.back.dto.response.party.PartyResponseDto;
import com.housing.back.dto.response.party.PartyListResponseDto;

public interface PartyService {

    ResponseEntity<? super PartyResponseDto> makeParty(PartyRequestDto dto);
    ResponseEntity<? super PartyListResponseDto> listAll();
    
}
