package com.took.user_api.repository.custom;


import com.took.user_api.dto.request.user.KakaoChangeRequestDto;

public interface UserCustomRepository{
    
    void kakaoChange(KakaoChangeRequestDto dto);



}
