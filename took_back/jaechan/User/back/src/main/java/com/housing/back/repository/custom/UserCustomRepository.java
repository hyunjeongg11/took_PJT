package com.housing.back.repository.custom;


import com.housing.back.dto.request.user.KakaoChangeRequestDto;
import com.housing.back.entity.UserEntity;


public interface UserCustomRepository{
    
    void kakaoChange(KakaoChangeRequestDto dto);



}
