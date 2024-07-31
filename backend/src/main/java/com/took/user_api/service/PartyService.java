package com.took.user_api.service;


import com.took.user_api.dto.request.party.PartyDetailRequestDto;
import com.took.user_api.dto.request.party.PartyDoneRequestDto;
import com.took.user_api.dto.request.party.makePartyRequestDto;
import com.took.user_api.dto.response.VoidResponseDto;
import com.took.user_api.dto.response.party.*;
import org.springframework.http.ResponseEntity;



public interface PartyService {


    ResponseEntity<? super PartyListResponseDto> listAll();
    ResponseEntity<? super PartyDoneResponseDto> partyDone(PartyDoneRequestDto dto);
    ResponseEntity<? super PartyDetailResponseDto>partyDetail(PartyDetailRequestDto dto);
    ResponseEntity<? super VoidResponseDto> makeParty(makePartyRequestDto dto);
}
