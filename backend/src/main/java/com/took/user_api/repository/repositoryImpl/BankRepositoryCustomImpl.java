package com.took.user_api.repository.repositoryImpl;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.took.user_api.entity.BankEntity;
import com.took.user_api.entity.QAccountEntity;
import com.took.user_api.entity.QBankEntity;
import com.took.user_api.repository.custom.BankRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BankRepositoryCustomImpl implements BankRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public BankEntity isMatched(String accountNum, int accountPwd) {

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

    @Override
    public void update(Long bankSeq, Long bankCost) {

        QBankEntity bank = QBankEntity.bankEntity;

        jpaQueryFactory.update(bank)
                .set(bank.balance, bankCost)
                .where(bank.bankSeq.eq(bankSeq))
                .execute();
    }

    @Override
    public List<BankEntity> findBanksByBankSeq(List<Long> bankSeq) {

        QBankEntity bank = QBankEntity.bankEntity;
        List<BankEntity> result = null;
        result = jpaQueryFactory.selectFrom(bank).where(bank.bankSeq.in(bankSeq)).fetch();
        return result;

    }

    @Override
    public void pay(Long bankSeq, Long cost) {

    }

}
