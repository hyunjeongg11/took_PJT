package com.housing.back.service;

import org.springframework.http.ResponseEntity;

import com.housing.back.dto.request.account.AccountLinkRequestDto;
import com.housing.back.dto.request.account.ChangeMainRequestDto;
import com.housing.back.dto.response.account.AccountLinkResponseDto;
import com.housing.back.dto.response.account.ChangeMainResponseDto;

public interface AccountService {

    ResponseEntity<? super AccountLinkResponseDto> saveAccount(AccountLinkRequestDto dto);
    ResponseEntity<? super ChangeMainResponseDto> changeMain(ChangeMainRequestDto dto);

    
}
