package com.took.user_api.dto.response.party;

import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.entity.MemberEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class MakePartyResponseDto extends ResponseDto {

    private Long partySeq;
    private Long memberSeq;


    private MakePartyResponseDto(Long partySeq, Long memberSeq) {
        this.partySeq = partySeq;
        this.memberSeq = memberSeq;
    }

    public static ResponseEntity<MakePartyResponseDto> success(Long partySeq, Long memberSeq) {
        MakePartyResponseDto responseBody = new MakePartyResponseDto(partySeq, memberSeq);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
