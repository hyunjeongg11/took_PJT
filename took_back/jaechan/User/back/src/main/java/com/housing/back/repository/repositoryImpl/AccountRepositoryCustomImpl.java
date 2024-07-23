package com.housing.back.repository.repositoryImpl;

import org.springframework.stereotype.Repository;

import com.housing.back.entity.QAccountEntity;
import com.housing.back.entity.QUserEntity;
import com.housing.back.repository.AccountRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;



@RequiredArgsConstructor
@Repository
public class AccountRepositoryCustomImpl implements AccountRepositoryCustom{
    
    private final JPAQueryFactory queryFactory;

    @Override
    public String FindAccountNum(String userId) {
        
    QAccountEntity account = QAccountEntity.accountEntity;
    QUserEntity user = QUserEntity.userEntity;

    Long userId = queryFactory.select(account.accountNum)
                              .from(accountEntity)
                              .join(accountEntity.user, userEntity)
                              .where(userEntity.userId.eq(userId))
                              .fetchOne();
    }

    
}
