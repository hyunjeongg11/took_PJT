package com.took.user_api.repository.custom;


import com.querydsl.core.Tuple;
import com.took.user_api.dto.LocationDto;
import com.took.user_api.dto.request.user.KakaoChangeRequestDto;

import java.util.List;

public interface UserCustomRepository{
    
    void kakaoChange(KakaoChangeRequestDto dto);
    List<Tuple> getAllLocation(Long userSeq);
    void changePwd(String encryptedPwd,Long userSeq);
}
