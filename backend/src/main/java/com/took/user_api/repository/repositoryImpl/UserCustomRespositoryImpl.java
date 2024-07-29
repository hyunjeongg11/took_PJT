package com.took.user_api.repository.repositoryImpl;



import com.querydsl.jpa.impl.JPAQueryFactory;
import com.took.user_api.dto.request.user.KakaoChangeRequestDto;
import com.took.user_api.entity.QUserEntity;
import com.took.user_api.entity.UserEntity;
import com.took.user_api.repository.custom.UserCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


@Repository
@RequiredArgsConstructor
public class UserCustomRespositoryImpl implements UserCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public void kakaoChange(KakaoChangeRequestDto dto) {
       
        QUserEntity userEntity = QUserEntity.userEntity;

        Long userSeq = dto.getUserSeq();
        String userName = dto.getUserName();
        UserEntity.Gender gender = dto.getGender();
        String phoneNumber = dto.getPhoneNumber();
        String userId = dto.getUserId();

        jpaQueryFactory.update(userEntity)
        .where(userEntity.userSeq.eq(Long.valueOf(userSeq)))
        .set(userEntity.userId, userId)
        .set(userEntity.userName,userName)
        .set(userEntity.gender , gender)
        .set(userEntity.phoneNumber,phoneNumber)
        .set(userEntity.loginStatus, UserEntity.LoginStatus.TOOK)
        .execute();
    }

    

    

    
}
