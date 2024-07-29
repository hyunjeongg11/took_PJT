package com.took.user_api.controller;


import com.took.user_api.dto.request.member.MemberSaveRequestDto;
import com.took.user_api.dto.request.party.PartyDetailRequestDto;
import com.took.user_api.dto.request.party.PartyDoneRequestDto;
import com.took.user_api.dto.request.party.PartyRequestDto;
import com.took.user_api.dto.request.party.PayAllResquestDto;
import com.took.user_api.dto.response.member.MemberSaveResponseDto;
import com.took.user_api.dto.response.party.*;
import com.took.user_api.service.MemberService;
import com.took.user_api.service.PartyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/pay")
@RequiredArgsConstructor
public class PartyController {

    private final PartyService partyService;
    private final MemberService memberService;


    // party 테이블 형성
    @PostMapping("/request-pay")
    public ResponseEntity<? super PartyResponseDto> RequestPay(
            @RequestBody @Valid PartyRequestDto requestBody) {
        ResponseEntity<? super PartyResponseDto> response = partyService.makeParty(requestBody);
        return response;
    }

    // 나의 테이블 확인하기
    @GetMapping("/party-list")
    public ResponseEntity<? super PartyListResponseDto> partyList() {

        ResponseEntity<? super PartyListResponseDto> response = partyService.listAll();
        return response;

    }

    //정산 알고리즘
    @PostMapping("/member")
    public ResponseEntity<? super MemberSaveResponseDto> member
    (@RequestBody @Valid MemberSaveRequestDto requestBody
    )
    {
        ResponseEntity<? super MemberSaveResponseDto> response = memberService.makeMember(requestBody);
        return response;
    }

    //정산 완료 되면 각 pay에 저장을 해줘야 한다.
    @PostMapping("/pay-all")
    public ResponseEntity<? super PayAllResponseDto> postMethodName
    (    
    @RequestBody @Valid PayAllResquestDto requestBody
    ) 
    {
        ResponseEntity<? super PayAllResponseDto> response = partyService.payAll(requestBody);   
        return response;
    }

    // party의 정산이 완료된 경우 true를 아닌 경우 false를 반환한다.
    @PostMapping("/party-done")
    public ResponseEntity<? super PartyDoneResponseDto> partyDone
    (
    @RequestBody @Valid PartyDoneRequestDto requestBody
    )
    {
        ResponseEntity<? super PartyDoneResponseDto> response = partyService.partyDone(requestBody);
        return response;
    }
    
    // 미정산자 (돈이 부족해서 보내지 못했을 경우 은행 재선택을 포함하여 ~을 보낸다.)
    @PostMapping("/re-pay")
    public String rePay(@RequestBody String entity) {
        
        
        return entity;
    }
    
    // pay-history를 더 자세히 본다.
    @PostMapping("/party-detail")
    public ResponseEntity<? super PartyDetailResponseDto> partyDetail
    (
    @RequestBody @Valid PartyDetailRequestDto requestBody
    ) {
        ResponseEntity<? super PartyDetailResponseDto> response = partyService.partyDetail(requestBody);
        return response;
    }
    
    
}
