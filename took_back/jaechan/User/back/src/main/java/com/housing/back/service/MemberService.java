package com.housing.back.service;

import org.springframework.http.ResponseEntity;

import com.housing.back.dto.request.member.MemberSaveRequestDto;
import com.housing.back.dto.response.member.MemberSaveResponseDto;

public interface MemberService {

    
    ResponseEntity<? super MemberSaveResponseDto> makeMember(MemberSaveRequestDto dto);


} 