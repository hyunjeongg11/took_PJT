package com.took.user_api.service;


import com.took.user_api.dto.request.party.PartyDetailRequestDto;
import com.took.user_api.dto.request.party.PartyDoneRequestDto;
import com.took.user_api.dto.request.party.PartyRequestDto;
import com.took.user_api.dto.request.party.PayAllResquestDto;
import com.took.user_api.dto.response.party.*;
import org.springframework.http.ResponseEntity;



public interface PartyService {

    ResponseEntity<? super PartyResponseDto> makeParty(PartyRequestDto dto);
    ResponseEntity<? super PartyListResponseDto> listAll();
    ResponseEntity<? super PayAllResponseDto> payAll(PayAllResquestDto dto);
    ResponseEntity<? super PartyDoneResponseDto> partyDone(PartyDoneRequestDto dto);
    ResponseEntity<? super PartyDetailResponseDto>partyDetail(PartyDetailRequestDto dto);
}
