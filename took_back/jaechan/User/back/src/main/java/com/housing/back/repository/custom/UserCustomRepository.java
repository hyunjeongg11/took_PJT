package com.housing.back.repository.custom;


import com.housing.back.dto.request.user.KakaoChangeRequestDto;


public interface UserCustomRepository{
    
    void kakaoChange(KakaoChangeRequestDto dto);

}
