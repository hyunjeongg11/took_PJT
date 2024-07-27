package com.housing.back.repository.custom;

import com.housing.back.entity.BankEntity;

public interface BankRepositoryCustom {
    
    BankEntity isMatched(String accountNum,String accountPwd);
    Long findBankSeqByUserSeq(Long userSeq);
    Long findBalanceByBankSeq(Long bankSeq);
}
