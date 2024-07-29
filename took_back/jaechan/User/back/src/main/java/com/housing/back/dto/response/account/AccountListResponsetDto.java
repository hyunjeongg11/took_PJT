package com.housing.back.dto.response.account;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.housing.back.dto.response.ResponseDto;
import com.housing.back.entity.AccountEntity;

import lombok.Getter;

@Getter
public class AccountListResponsetDto extends ResponseDto{


    private List<AccountEntity> list;

    private AccountListResponsetDto(List<AccountEntity> list){
        this.list=list;
    }
    

     public static ResponseEntity<AccountListResponsetDto> success(List<AccountEntity> list) {
        AccountListResponsetDto responseBody = new AccountListResponsetDto(list);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
