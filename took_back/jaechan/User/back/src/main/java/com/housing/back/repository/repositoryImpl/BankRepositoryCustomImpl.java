package com.housing.back.repository.repositoryImpl;

import org.springframework.stereotype.Repository;

import com.housing.back.entity.BankEntity;
import com.housing.back.entity.QBankEntity;
import com.housing.back.repository.BankRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BankRepositoryCustomImpl implements BankRepositoryCustom{
    
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public BankEntity isMatched(String accountNum, String accountPwd) {

        QBankEntity bank = QBankEntity.bankEntity;
        BankEntity result = null;

        result= jpaQueryFactory
            .selectFrom(bank)
            .where(bank.accountNum.eq(accountNum)
            .and(bank.accountPwd.eq(accountPwd)))
            .fetchOne();

        return result;
    }


}
