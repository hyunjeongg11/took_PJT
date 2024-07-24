package com.housing.back.repository.repositoryImpl;

import org.springframework.stereotype.Repository;

import com.housing.back.entity.QAccountEntity;
import com.housing.back.entity.QUserEntity;
import com.housing.back.repository.custom.AccountRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;



@RequiredArgsConstructor
@Repository
public class AccountRepositoryCustomImpl implements AccountRepositoryCustom{
    
    private final JPAQueryFactory queryFactory;


    @Override
    public Long FindBankSeq(Long userSeq) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'FindBankSeq'");
    }

    @Override
    public void changeMain(Long userSeq) {
        
        QAccountEntity account = QAccountEntity.accountEntity;

        queryFactory.update(account)
                    .set(account.main, false)
                    .where(account.user.userSeq.eq(userSeq))
                    .execute();
    }

}
