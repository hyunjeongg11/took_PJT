package com.housing.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.housing.back.dto.request.party.PartyRequestDto;
import com.housing.back.dto.response.party.PartyResponseDto;
import com.housing.back.dto.response.party.PartyListResponseDto;
import com.housing.back.dto.request.member.MemberSaveRequestDto;
import com.housing.back.dto.request.member.memberSaveRequestDto;
import com.housing.back.dto.response.member.MemberSaveResponseDto;
import com.housing.back.service.MemberService;
import com.housing.back.service.PartyService;
import com.housing.back.service.implement.MemberServiceImpl;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/pay")
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
        System.out.println("컨트롤러에서 응답을 출력합니다."+response);
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
    
    
}
