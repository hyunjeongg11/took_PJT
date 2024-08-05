package com.took.user_api.dto.response.account;


import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.entity.AccountEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class AccountListResponsetDto extends ResponseDto {


    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class BankAccount{

        private Long userSeq;
        private Long accountSeq;
        private String accountName;
        private String accountNum;
        private int bankNum;
        private Long balance;

    }

    private List<BankAccount> list;

    private AccountListResponsetDto(List<BankAccount> list){
        this.list=list;
    }

     public static ResponseEntity<AccountListResponsetDto> success(List<BankAccount> list) {
        AccountListResponsetDto responseBody = new AccountListResponsetDto(list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }


}
