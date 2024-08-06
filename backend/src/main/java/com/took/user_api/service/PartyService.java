package com.took.user_api.service;


import com.took.user_api.dto.request.party.PartyDetailRequestDto;
import com.took.user_api.dto.request.party.PartyDoneRequestDto;
import com.took.user_api.dto.request.party.MakePartyRequestDto;
import com.took.user_api.dto.request.party.hostPayRequestDto;
import com.took.user_api.dto.response.VoidResponseDto;
import com.took.user_api.dto.response.party.*;
import org.springframework.http.ResponseEntity;



public interface PartyService {

    ResponseEntity<? super PartyDoneResponseDto> partyDone(PartyDoneRequestDto dto);
    ResponseEntity<? super PartyDetailResponseDto>partyDetail(PartyDetailRequestDto dto);
    ResponseEntity<? super MakePartyResponseDto> makeParty(MakePartyRequestDto dto);
    ResponseEntity<? super PartyListResponseDto> myPartyList(Long userSeq);
    ResponseEntity<?> partyDelete(Long partySeq);
    ResponseEntity<? super VoidResponseDto> hostpay(hostPayRequestDto requestBody);
}
