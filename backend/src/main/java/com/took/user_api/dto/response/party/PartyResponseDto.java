package com.took.user_api.dto.response.party;


import com.took.user_api.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
