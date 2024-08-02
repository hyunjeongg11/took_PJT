package com.took.user_api.dto.response.member;


import com.took.user_api.dto.response.ResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberSaveResponseDto extends ResponseDto {

    private Long memberSeq;

    public static ResponseEntity<MemberSaveResponseDto> success() {
        MemberSaveResponseDto responseBody = new MemberSaveResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

    public static ResponseEntity<MemberSaveResponseDto> success(Long memberSeq) {
        MemberSaveResponseDto responseBody = new MemberSaveResponseDto(memberSeq);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
