package com.housing.back.repository.repositoryImpl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.housing.back.entity.AccountEntity;
import com.housing.back.entity.QAccountEntity;
import com.housing.back.repository.custom.AccountRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class AccountRepositoryCustomImpl implements AccountRepositoryCustom {

    private final EntityManager entityManager;

    private final JPAQueryFactory queryFactory;

    @Override
    public void isMain(Long userSeq) {

        QAccountEntity account = QAccountEntity.accountEntity;

        queryFactory.update(account)
                .set(account.main, false)
                .where(account.user.userSeq.eq(userSeq))
                .execute();
    }

    @Override
    public List<AccountEntity> findAccountsByUserSeq(Long userSeq) {

        QAccountEntity account = QAccountEntity.accountEntity;

        List<AccountEntity> list = queryFactory.selectFrom(account)
                .where(account.user.userSeq.eq(userSeq))
                .fetch();

        return list;
    }

    @Override
    public void changeMain(Long userSeq, Long accountSeq) {
        QAccountEntity accountEntity = QAccountEntity.accountEntity;

        queryFactory.update(accountEntity)
                .set(accountEntity.main, false)
                .where(accountEntity.user.userSeq.eq(userSeq).and(accountEntity.accountSeq.ne(accountSeq)))
                .execute();

        queryFactory.update(accountEntity)
                .set(accountEntity.main, true)
                .where(accountEntity.accountSeq.eq(accountSeq))
                .execute();

        entityManager.flush();

    }

    @Override
    public Long findBankSeqByAccountSeq(Long accountSeq) {

        Long bankSeq = null;

        QAccountEntity account = QAccountEntity.accountEntity;

        bankSeq = queryFactory.select(account.bank.bankSeq)
                .from(account)
                .where(account.accountSeq.eq(accountSeq)) // 조건: accountSeq가 일치
                .fetchOne();

        return bankSeq;
    }

}
