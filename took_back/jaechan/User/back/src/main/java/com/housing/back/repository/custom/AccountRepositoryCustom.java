package com.housing.back.repository.custom;

import java.util.List;

import com.housing.back.entity.AccountEntity;


public interface AccountRepositoryCustom {
 
    List<AccountEntity> findAccountsByUserSeq(Long userSeq);
    void isMain(Long userSeq);
    void changeMain(Long userSeq,Long accountSeq);
    Long findBankSeqByAccountSeq(Long accountSeq);
    void updateEasyPwd(Long accountSeq, String easyPwd);
    String checkEasyPwd(Long accountSeq);
} 
