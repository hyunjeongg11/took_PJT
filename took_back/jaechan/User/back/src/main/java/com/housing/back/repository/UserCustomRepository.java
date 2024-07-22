package com.housing.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.housing.back.dto.response.user.KakaoChangeResponseDto;
import com.housing.back.dto.request.user.KakaoChangeRequestDto;
import com.housing.back.entity.CertificationEntity;
import com.housing.back.entity.UserEntity;

public interface UserCustomRepository{
    
    void kakaoChange(KakaoChangeRequestDto dto);

}
