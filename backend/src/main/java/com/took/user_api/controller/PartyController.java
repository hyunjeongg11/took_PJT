package com.took.user_api.controller;

import com.took.user_api.dto.request.member.MemberSaveRequestDto;
import com.took.user_api.dto.request.party.PartyDetailRequestDto;
import com.took.user_api.dto.request.party.PartyDoneRequestDto;
import com.took.user_api.dto.request.party.MakePartyRequestDto;
import com.took.user_api.dto.response.member.MemberSaveResponseDto;
import com.took.user_api.dto.response.party.*;
import com.took.user_api.service.MemberService;
import com.took.user_api.service.PartyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@RestController
@RequestMapping("/api/pay")
@RequiredArgsConstructor
public class PartyController {

    private final PartyService partyService;
    private final MemberService memberService;

    @Operation(summary = "파티 생성", description = "새로운 파티를 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "파티 생성 성공",
                    content = @Content(schema = @Schema(implementation = MakePartyResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @PostMapping("/make-party")
    public ResponseEntity<? super MakePartyResponseDto> makeParty(
            @RequestBody @Valid MakePartyRequestDto requestBody
    ) {
        return partyService.makeParty(requestBody);
    }

    @Operation(summary = "멤버 추가", description = "파티에 새로운 멤버를 추가합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "멤버 추가 성공",
                    content = @Content(schema = @Schema(implementation = MemberSaveResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @PostMapping("/insert-member")
    public ResponseEntity<? super MemberSaveResponseDto> insertMember(
            @RequestBody @Valid MemberSaveRequestDto requestBody
    ) {
        return memberService.insertMember(requestBody);
    }

    @Operation(summary = "사용자 파티 목록 조회", description = "특정 사용자의 파티 목록을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "파티 목록 조회 성공",
                    content = @Content(schema = @Schema(implementation = PartyListResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @GetMapping("/party-list/{userSeq}")
    public ResponseEntity<? super PartyListResponseDto> partyList(
            @PathVariable("userSeq") Long userSeq
    ) {
        return partyService.myPartyList(userSeq);
    }


    @Operation(summary = "멤버 정산", description = "파티의 멤버 정산을 처리합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "멤버 정산 성공",
                    content = @Content(schema = @Schema(implementation = MemberSaveResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @PostMapping("/member")
    public ResponseEntity<? super MemberSaveResponseDto> member(
            @RequestBody @Valid MemberSaveRequestDto requestBody
    ) {
        return memberService.makeMember(requestBody);
    }



    @Operation(summary = "파티 정산 완료", description = "파티의 정산 완료 여부를 확인합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "정산 완료 성공",
                    content = @Content(schema = @Schema(implementation = PartyDoneResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @PostMapping("/party-done")
    public ResponseEntity<? super PartyDoneResponseDto> partyDone(
            @RequestBody @Valid PartyDoneRequestDto requestBody
    ) {
        return partyService.partyDone(requestBody);
    }

    @Operation(summary = "파티 상세 조회", description = "파티의 상세 내역을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "파티 상세 조회 성공",
                    content = @Content(schema = @Schema(implementation = PartyDetailResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @PostMapping("/party-detail")
    public ResponseEntity<? super PartyDetailResponseDto> partyDetail(
            @RequestBody @Valid PartyDetailRequestDto requestBody
    ) {
        return partyService.partyDetail(requestBody);
    }
}
