package com.took.user_api.repository.custom;


import com.took.user_api.entity.BankEntity;

import java.util.List;

public interface BankRepositoryCustom {
    
    BankEntity isMatched(String accountNum, int accountPwd);
    Long findBankSeqByUserSeq(Long userSeq);
    Long findBalanceByBankSeq(Long bankSeq);
    void update(Long bankSeq, Long bankCost);
    List<BankEntity> findBanksByBankSeq(List<Long> bankSeq);
}
