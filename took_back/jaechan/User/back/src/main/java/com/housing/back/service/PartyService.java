package com.housing.back.service;

import org.springframework.http.ResponseEntity;

import com.housing.back.dto.request.party.PartyDetailRequestDto;
import com.housing.back.dto.request.party.PartyDoneRequestDto;
import com.housing.back.dto.request.party.PartyRequestDto;
import com.housing.back.dto.request.party.PayAllResquestDto;
import com.housing.back.dto.response.party.PartyDoneResponseDto;
import com.housing.back.dto.response.party.PartyListResponseDto;
import com.housing.back.dto.response.party.PayAllResponseDto;
import com.housing.back.dto.response.party.PartyResponseDto;
import com.housing.back.dto.response.party.PartyDetailResponseDto;



public interface PartyService {

    ResponseEntity<? super PartyResponseDto> makeParty(PartyRequestDto dto);
    ResponseEntity<? super PartyListResponseDto> listAll();
    ResponseEntity<? super PayAllResponseDto> payAll(PayAllResquestDto dto);
    ResponseEntity<? super PartyDoneResponseDto> partyDone(PartyDoneRequestDto dto);
    ResponseEntity<? super PartyDetailResponseDto>partyDetail(PartyDetailRequestDto dto);
}
