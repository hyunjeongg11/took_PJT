package com.took.user_api.dto.response.account;

import com.took.user_api.dto.response.ResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Schema(description = "계좌 목록 응답 DTO")
@Getter
public class AccountListResponsetDto extends ResponseDto {

    @Schema(description = "은행 계좌 정보를 담고 있는 내부 클래스")
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class BankAccount {

        @Schema(description = "사용자 시퀀스", example = "1")
        private Long userSeq;

        @Schema(description = "계좌 이름", example = "우리은행 체크카드")
        private String accountName;

        @Schema(description = "계좌 번호", example = "123-456-789")
        private String accountNum;

        @Schema(description = "은행 번호", example = "101")
        private int bankNum;

        @Schema(description = "잔액", example = "1000000")
        private Long balance;
    }

    @Schema(description = "은행 계좌 목록")
    private List<BankAccount> list;

    private AccountListResponsetDto(List<BankAccount> list) {
        this.list = list;
    }

    @Schema(description = "계좌 목록 응답 성공")
    public static ResponseEntity<AccountListResponsetDto> success(List<BankAccount> list) {
        AccountListResponsetDto responseBody = new AccountListResponsetDto(list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
