package com.housing.back.repository.repositoryImpl;

import org.springframework.stereotype.Repository;

import com.housing.back.entity.BankEntity;
import com.housing.back.entity.QAccountEntity;
import com.housing.back.entity.QBankEntity;
import com.housing.back.repository.custom.BankRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BankRepositoryCustomImpl implements BankRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public BankEntity isMatched(String accountNum, String accountPwd) {

        QBankEntity bank = QBankEntity.bankEntity;
        BankEntity result = null;

        result = jpaQueryFactory
                .selectFrom(bank)
                .where(bank.accountNum.eq(accountNum)
                        .and(bank.accountPwd.eq(accountPwd)))
                .fetchOne();

        return result;
    }

    @Override
    public Long findBankSeqByUserSeq(Long userSeq) {

        QAccountEntity account = QAccountEntity.accountEntity;

        Long result = null;

        result = jpaQueryFactory.select(account.bank.bankSeq)
                .from(account)
                .where(account.user.userSeq.eq(userSeq).and(account.main.isTrue()))
                .fetchOne();

        return result;

    }

    @Override
    public Long findBalanceByBankSeq(Long bankSeq) {

        QBankEntity bank = QBankEntity.bankEntity;

        Long Balance = null;

        Balance = jpaQueryFactory.select(bank.balance)
                .from(bank)
                .where(bank.bankSeq.eq(bankSeq))
                .fetchOne();

        return Balance;

    }

}
