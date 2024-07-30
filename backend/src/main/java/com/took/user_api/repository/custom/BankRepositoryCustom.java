package com.took.user_api.repository.custom;


import com.took.user_api.entity.BankEntity;

public interface BankRepositoryCustom {
    
    BankEntity isMatched(String accountNum, String accountPwd);
    Long findBankSeqByUserSeq(Long userSeq);
    Long findBalanceByBankSeq(Long bankSeq);
    void update(Long bankSeq, Long bankCost);
}
