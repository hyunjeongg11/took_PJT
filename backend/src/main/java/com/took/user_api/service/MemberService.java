package com.took.user_api.service;


import com.took.user_api.dto.request.member.MemberSaveRequestDto;
import com.took.user_api.dto.response.member.MemberSaveResponseDto;
import org.springframework.http.ResponseEntity;

public interface MemberService {

    
    ResponseEntity<? super MemberSaveResponseDto> makeMember(MemberSaveRequestDto dto);


} 