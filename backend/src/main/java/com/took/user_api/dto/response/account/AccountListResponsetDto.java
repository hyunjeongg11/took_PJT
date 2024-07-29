package com.took.user_api.dto.response.account;


import com.took.user_api.dto.response.ResponseDto;
import com.took.user_api.entity.AccountEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class AccountListResponsetDto extends ResponseDto {


    private List<AccountEntity> list;

    private AccountListResponsetDto(List<AccountEntity> list){
        this.list=list;
    }
    

     public static ResponseEntity<AccountListResponsetDto> success(List<AccountEntity> list) {
        AccountListResponsetDto responseBody = new AccountListResponsetDto(list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
