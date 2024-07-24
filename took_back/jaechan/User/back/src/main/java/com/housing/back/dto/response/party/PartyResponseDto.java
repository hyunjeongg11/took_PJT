package com.housing.back.dto.response.party;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class PartyResponseDto extends ResponseDto {

  private PartyResponseDto() {
    super();
  }

  public static ResponseEntity<PartyResponseDto> success() {
    PartyResponseDto responseBody = new PartyResponseDto();
    return ResponseEntity.status(HttpStatus.OK).body(responseBody);
  }

}
