package com.housing.back.repository.repositoryImpl;


import com.housing.back.entity.QUserEntity;
import org.springframework.stereotype.Repository;

import com.housing.back.repository.UserCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import com.housing.back.dto.request.user.KakaoChangeRequestDto;
import com.housing.back.entity.UserEntity;
import com.housing.back.entity.UserEntity.Gender;
import com.housing.back.entity.UserEntity.LoginStatus;


@Repository
@RequiredArgsConstructor
public class UserCustomRespositoryImpl implements UserCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    @Transactional
    public void kakaoChange(KakaoChangeRequestDto dto) {
       
        QUserEntity userEntity = QUserEntity.userEntity;

        Long userSeq = dto.getUserSeq();
        String userName = dto.getUserName();
        Gender gender = dto.getGender();
        String phoneNumber = dto.getPhoneNumber();
        String userId = dto.getUserId();

        jpaQueryFactory.update(userEntity)
        .where(userEntity.userSeq.eq(Long.valueOf(userSeq)))
        .set(userEntity.userId, userId)
        .set(userEntity.userName,userName)
        .set(userEntity.gender , gender)
        .set(userEntity.phoneNumber,phoneNumber)
        .set(userEntity.loginStatus,LoginStatus.TOOK)
        .execute();
    }

    

    

    
}
