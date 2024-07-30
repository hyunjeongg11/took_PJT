package com.took.user_api.dto.response.party;


import com.took.user_api.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class PartyResponseDto extends ResponseDto {

  private Long partySeq;

  private PartyResponseDto(Long partySeq) {
    this.partySeq = partySeq;
  }

  public static ResponseEntity<PartyResponseDto> success(Long partySeq) {
    PartyResponseDto responseBody = new PartyResponseDto(partySeq);
    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }

}
