package com.took.user_api.controller;

import com.took.user_api.dto.request.member.MemberSaveRequestDto;
import com.took.user_api.dto.request.member.MemberPartySeqRequestDto;
import com.took.user_api.dto.request.party.*;
import com.took.user_api.dto.request.user.UserSeqRequestDto;
import com.took.user_api.dto.response.VoidResponseDto;
import com.took.user_api.dto.response.member.MemberSaveResponseDto;
import com.took.user_api.dto.response.party.*;
import com.took.user_api.service.AccountService;
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

    private final AccountService accountService;
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

    @Operation(summary = "멤버 삭제", description = "파티에 맴버를 제거합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "멤버 추가 성공",
                    content = @Content(schema = @Schema(implementation = MemberSaveResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @PostMapping("/delete-member")
    public ResponseEntity<? super MemberSaveResponseDto> deleteMember(
            @RequestBody @Valid MemberSaveRequestDto requestBody
    ) {
        return memberService.deleteMember(requestBody);
    }


    //  알람 보내는 로직 여기에 추가할 것.
    //  결제자도 자기 돈을 입력해야한다.
    @Operation(summary = "맴버 전체 저장", description = "파티에 존재 하는 모든 맴버를 추가합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "멤버 추가 성공",
                    content = @Content(schema = @Schema(implementation = MemberSaveResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @PostMapping("/insert-all-member")
    public ResponseEntity<? super VoidResponseDto> insertAllMember(@RequestBody InsertAllMemberRequestDto requestBody) {
        ResponseEntity<? super VoidResponseDto> response = partyService.insertAllMember(requestBody);
        return response;
    }


    @Operation(summary = "오직 정산, 맴버들이 돈 보낼때", description = "참여 맴버가 확인 버튼을 누를 떄 호출됩니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "맴버 결제 성공!",
                    content = @Content(schema = @Schema(implementation = MemberSaveResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @PostMapping("/only-jungsan-pay")
    public ResponseEntity<? super ojResponseDto> onlyjungsan(@RequestBody MemberUserSeqRequestDto requestBody){
        ResponseEntity<? super ojResponseDto> response = partyService.onlyjungsanPay(requestBody.getMemberSeq(),requestBody.getUserSeq());
        return  response;
    }

    @Operation(summary = "오직 정산 후 정산자가 돈 받을 때", description = "?? 언제 실행하지는 미정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "맴버 결제 성공!",
                    content = @Content(schema = @Schema(implementation = MemberSaveResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @PostMapping("/only-jungsan-host-recieve")
    public ResponseEntity<? super ojResponseDto> onlyjungsanRecieve(@RequestBody PartyUserSeqRequestDto requestBody){
        ResponseEntity<? super ojResponseDto> response = partyService.onlyjungsanRecieve(requestBody.getPartySeq(),requestBody.getUserSeq());
        return  response;
    }



    @Operation(summary = "[배달, 공구] 유저가 돈 보낼때", description = "참여 맴버가 확인 버튼을 누를 떄 호출됩니다. 완료시 done에 true 반환")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "맴버 결제 성공!",
                    content = @Content(schema = @Schema(implementation = MemberSaveResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @PostMapping("/deli-gongu-pay")
    public ResponseEntity<? super ojResponseDto>deligonguPay(@RequestBody MemberUserSeqRequestDto requestBody){
        ResponseEntity<? super ojResponseDto> response = partyService.deligonguPay(requestBody.getMemberSeq(),requestBody.getUserSeq());
        return response;
    }

    @Operation(summary = "[배달, 공구] 가 수령 했을때", description = "참여 맴버들이 수령을 확인합니다. 모두 수령을 끝내면 done에 true를 반환합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "맴버 수령 성공!!",
                    content = @Content(schema = @Schema(implementation = MemberSaveResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @PostMapping("/deli-gongu-done")
    public ResponseEntity<? super ojResponseDto>deligonguDone(@RequestBody MemberPartySeqRequestDto requestBody){
        ResponseEntity<? super ojResponseDto> response = partyService.deligonguRecieve(requestBody.getPartySeq(),requestBody.getMemberSeq());
        return response;
    }

    @Operation(summary = "[배달, 공구] 수령 후 입금.", description = "참여 맴버들이 수령을 확인합니다. 모두 수령을 끝내면 done에 true를 반환합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "맴버 수령 성공!!",
                    content = @Content(schema = @Schema(implementation = MemberSaveResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청")
    })
    @PostMapping("/deli-gongu-host-recieve")
    public ResponseEntity<? super ojResponseDto>deligonguHostRecieve(@RequestBody PartyUserSeqRequestDto requestBody){
        ResponseEntity<? super ojResponseDto> response = partyService.deligonguHostRecieve(requestBody.getPartySeq(),requestBody.getUserSeq());
        return response;
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

    @Operation(summary = "파티 삭제", description = "파티를 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "파티 삭제 성공",
                    content = @Content(schema = @Schema(implementation = PartyDetailResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청"),
            @ApiResponse(responseCode = "500", description = "잘못된 서버")
    })
    @DeleteMapping("/party-delete/{partySeq}")
    public ResponseEntity<?> partyDelete(@PathVariable("partySeq") Long partySeq) {
        return partyService.partyDelete(partySeq);
    }
}
