package com.took.user_api.service;


import com.took.user_api.dto.request.party.*;
import com.took.user_api.dto.response.VoidResponseDto;
import com.took.user_api.dto.response.party.*;
import org.springframework.http.ResponseEntity;



public interface PartyService {

     ResponseEntity<? super PartyDetailResponseDto>partyDetail(PartyDetailRequestDto dto);
    ResponseEntity<? super MakePartyResponseDto> makeParty(MakePartyRequestDto dto);
    ResponseEntity<?> partyDelete(Long partySeq);
    ResponseEntity<? super VoidResponseDto> insertAllMember(InsertAllMemberRequestDto requestBody);
    ResponseEntity<? super ojResponseDto> onlyjungsanPay(Long partySeq,Long userSeq);
    ResponseEntity<? super ojResponseDto> deligonguPay(Long memberSeq,Long userSeq);
    ResponseEntity<? super ojResponseDto> deligonguRecieve(Long partySeq,Long memberSeq);
    void deligonguHostRecieve(Long partySeq,Long userSeq);
    ResponseEntity<? super ojResponseDto> onlyjungsanRecieve(Long partySeq, Long userSeq);

    Long makeTaxiParty(MakeTaxiPartyRequest requestBody);

    void finalTaxiParty(FinalTaxiPartyRequest requestBody);
}
